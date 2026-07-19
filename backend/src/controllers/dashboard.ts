import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalProducts, totalCategories, allProducts, todayIn, todayOut] = await prisma.$transaction([
      prisma.product.count({ where: { deletedAt: null } }),
      prisma.category.count({ where: { deletedAt: null } }),
      prisma.product.findMany({
        where: { deletedAt: null },
        select: { stockQuantity: true, minimumStock: true }
      }),
      prisma.stockMovement.aggregate({
        where: { movementType: 'IN', createdAt: { gte: today } },
        _sum: { changeAmount: true }
      }),
      prisma.stockMovement.aggregate({
        where: { movementType: 'OUT', createdAt: { gte: today } },
        _sum: { changeAmount: true }
      })
    ]);

    const lowStockCount = allProducts.filter(p => p.stockQuantity <= p.minimumStock).length;
    const totalStock = allProducts.reduce((sum, p) => sum + p.stockQuantity, 0);

    // En çok hareket gören ürün (son 30 gün)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const mostMovedGroup = await prisma.stockMovement.groupBy({
      by: ['productId'],
      where: { createdAt: { gte: thirtyDaysAgo } },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 1
    });

    let mostUsedProduct: { name: string; quantity: number } | null = null;
    if (mostMovedGroup.length > 0) {
      const prod = await prisma.product.findUnique({
        where: { id: mostMovedGroup[0].productId },
        select: { name: true, stockQuantity: true }
      });
      if (prod) {
        mostUsedProduct = { name: prod.name, quantity: prod.stockQuantity };
      }
    }

    res.json({
      totalProducts,
      totalCategories,
      lowStockCount,
      totalStock,
      todayIn: todayIn._sum.changeAmount || 0,
      todayOut: Math.abs(todayOut._sum.changeAmount || 0),
      mostUsedProduct
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Dashboard istatistikleri yüklenirken hata oluştu' });
  }
};

export const getDashboardCharts = async (req: Request, res: Response) => {
  try {
    // 1. Kategori dağılımı
    const categories = await prisma.category.findMany({
      where: { deletedAt: null, parentId: null },
      include: {
        products: { where: { deletedAt: null } },
        children: {
          where: { deletedAt: null },
          include: {
            products: { where: { deletedAt: null } }
          }
        }
      }
    });

    const categoryDistribution = categories.map(cat => {
      let stockSum = cat.products.reduce((sum, p) => sum + p.stockQuantity, 0);
      let productCount = cat.products.length;

      cat.children.forEach(sub => {
        stockSum += sub.products.reduce((sum, p) => sum + p.stockQuantity, 0);
        productCount += sub.products.length;
      });

      return {
        categoryName: cat.name,
        color: cat.color || 'slate-500',
        productCount,
        totalStock: stockSum
      };
    });

    // 2. Son stok hareketleri (10 adet)
    const recentMovements = await prisma.stockMovement.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        product: { select: { name: true, productCode: true } },
        user: { select: { username: true } }
      }
    });

    // 3. Son eklenen ürünler
    const recentProducts = await prisma.product.findMany({
      take: 5,
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: { category: { select: { name: true } } }
    });

    // 4. Kritik stoklar (İlk 5)
    const allProducts = await prisma.product.findMany({
      where: { deletedAt: null },
      orderBy: { stockQuantity: 'asc' },
      take: 20,
      select: {
        id: true,
        name: true,
        productCode: true,
        stockQuantity: true,
        minimumStock: true
      }
    });

    const criticalStocks = allProducts
      .filter(p => p.stockQuantity <= p.minimumStock)
      .slice(0, 5)
      .map(p => ({
        id: p.id,
        name: p.name,
        productCode: p.productCode,
        stockQuantity: p.stockQuantity,
        minimumStock: p.minimumStock,
        percentage: p.minimumStock > 0
          ? Math.round((p.stockQuantity / p.minimumStock) * 100)
          : 0
      }));

    res.json({
      categoryDistribution,
      recentMovements,
      recentProducts,
      criticalStocks
    });
  } catch (error) {
    console.error('Dashboard charts error:', error);
    res.status(500).json({ error: 'Grafik verileri yüklenirken hata oluştu' });
  }
};
