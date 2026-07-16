import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [totalProducts, totalCategories, allProducts] = await prisma.$transaction([
      prisma.product.count({ where: { deletedAt: null } }),
      prisma.category.count({ where: { deletedAt: null } }),
      prisma.product.findMany({
        where: { deletedAt: null },
        select: { stockQuantity: true, minimumStock: true }
      })
    ]);

    const lowStockCount = allProducts.filter(p => p.stockQuantity <= p.minimumStock).length;
    const totalStock = allProducts.reduce((sum, p) => sum + p.stockQuantity, 0);

    res.json({
      totalProducts,
      totalCategories,
      lowStockCount,
      totalStock
    });
  } catch (error) {
    res.status(500).json({ error: 'Dashboard istatistikleri yüklenirken hata oluştu' });
  }
};

export const getDashboardCharts = async (req: Request, res: Response) => {
  try {
    // 1. Fetch categories with product count & sum of stock
    const categories = await prisma.category.findMany({
      where: { deletedAt: null, parentId: null }, // Parent categories
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
      // Sum stock of this parent category + all its subcategories
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

    // 2. Fetch recent stock movements (last 10)
    const recentMovements = await prisma.stockMovement.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        product: {
          select: { name: true, productCode: true }
        },
        user: {
          select: { username: true }
        }
      }
    });

    // 3. Fetch recent products added
    const recentProducts = await prisma.product.findMany({
      take: 5,
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: {
        category: { select: { name: true } }
      }
    });

    res.json({
      categoryDistribution,
      recentMovements,
      recentProducts
    });
  } catch (error) {
    console.error('Dashboard charts error:', error);
    res.status(500).json({ error: 'Grafik verileri yüklenirken hata oluştu' });
  }
};
