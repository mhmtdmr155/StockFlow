import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { AuthenticatedRequest } from '../middlewares/auth';

const productSelectFields = {
  id: true,
  name: true,
  productCode: true,
  stockQuantity: true,
  minimumStock: true,
  location: true,
  category: { select: { name: true, icon: true } }
};

// GET /api/projects
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      where: { deletedAt: null },
      include: {
        products: {
          include: {
            product: { select: productSelectFields }
          },
          orderBy: { assignedAt: 'asc' }
        },
        createdBy: { select: { username: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Projeler yüklenirken hata oluştu' });
  }
};

// GET /api/projects/:id
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Geçersiz proje ID' });

    const project = await prisma.project.findFirst({
      where: { id, deletedAt: null },
      include: {
        products: {
          include: {
            product: { select: productSelectFields },
            assignedBy: { select: { username: true } }
          },
          orderBy: { assignedAt: 'asc' }
        },
        createdBy: { select: { username: true } }
      }
    });

    if (!project) return res.status(404).json({ error: 'Proje bulunamadı' });
    res.json(project);
  } catch (error) {
    console.error('Get project by id error:', error);
    res.status(500).json({ error: 'Proje yüklenirken hata oluştu' });
  }
};

// POST /api/projects
export const createProject = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthenticatedRequest;
    const { name, description, status, startDate, endDate, productIds } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Proje adı zorunludur' });
    }

    // productIds: Array<{ productId: number; quantity: number; note?: string }>
    const productsData = Array.isArray(productIds) ? productIds : [];

    const project = await prisma.project.create({
      data: {
        name: name.trim(),
        description: description || null,
        status: status || 'PLANNING',
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        createdById: authReq.user?.id || null,
        products: {
          create: productsData.map((p: { productId: number; quantity?: number; note?: string }) => ({
            productId: p.productId,
            quantity: p.quantity || 1,
            note: p.note || null,
            assignedById: authReq.user?.id || null
          }))
        }
      },
      include: {
        products: {
          include: { product: { select: productSelectFields } }
        },
        createdBy: { select: { username: true } }
      }
    });

    await prisma.auditLog.create({
      data: {
        userId: authReq.user?.id,
        entityType: 'PROJECT',
        entityId: project.id,
        action: 'CREATE',
        newData: project as any
      }
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Proje oluşturulurken hata oluştu' });
  }
};

// PUT /api/projects/:id
export const updateProject = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthenticatedRequest;
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Geçersiz proje ID' });

    const existing = await prisma.project.findFirst({ where: { id, deletedAt: null } });
    if (!existing) return res.status(404).json({ error: 'Proje bulunamadı' });

    const { name, description, status, startDate, endDate } = req.body;

    const updated = await prisma.project.update({
      where: { id },
      data: {
        name: name !== undefined ? name.trim() : existing.name,
        description: description !== undefined ? description : existing.description,
        status: status !== undefined ? status : existing.status,
        startDate: startDate !== undefined ? (startDate ? new Date(startDate) : null) : existing.startDate,
        endDate: endDate !== undefined ? (endDate ? new Date(endDate) : null) : existing.endDate
      },
      include: {
        products: { include: { product: { select: productSelectFields } } },
        createdBy: { select: { username: true } }
      }
    });

    await prisma.auditLog.create({
      data: {
        userId: authReq.user?.id,
        entityType: 'PROJECT',
        entityId: id,
        action: 'UPDATE',
        oldData: existing as any,
        newData: updated as any
      }
    });

    res.json(updated);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Proje güncellenirken hata oluştu' });
  }
};

// DELETE /api/projects/:id
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthenticatedRequest;
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Geçersiz proje ID' });

    const existing = await prisma.project.findFirst({ where: { id, deletedAt: null } });
    if (!existing) return res.status(404).json({ error: 'Proje bulunamadı' });

    await prisma.project.update({
      where: { id },
      data: { deletedAt: new Date() }
    });

    await prisma.auditLog.create({
      data: {
        userId: authReq.user?.id,
        entityType: 'PROJECT',
        entityId: id,
        action: 'DELETE',
        oldData: existing as any
      }
    });

    res.json({ success: true, message: 'Proje başarıyla silindi' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Proje silinirken hata oluştu' });
  }
};

// POST /api/projects/:id/products
export const addProductToProject = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthenticatedRequest;
    const projectId = parseInt(req.params.id);
    const { productId, quantity, note } = req.body;

    if (isNaN(projectId) || !productId) {
      return res.status(400).json({ error: 'Geçersiz proje veya ürün ID' });
    }

    const project = await prisma.project.findFirst({ where: { id: projectId, deletedAt: null } });
    if (!project) return res.status(404).json({ error: 'Proje bulunamadı' });

    const product = await prisma.product.findFirst({ where: { id: parseInt(productId), deletedAt: null } });
    if (!product) return res.status(404).json({ error: 'Ürün bulunamadı' });

    // Zaten atanmış mı?
    const existing = await prisma.projectProduct.findUnique({
      where: { projectId_productId: { projectId, productId: parseInt(productId) } }
    });

    if (existing) {
      // Zaten varsa miktarı artır
      const updated = await prisma.projectProduct.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + (parseInt(quantity) || 1) },
        include: { product: { select: productSelectFields } }
      });
      return res.json(updated);
    }

    const pp = await prisma.projectProduct.create({
      data: {
        projectId,
        productId: parseInt(productId),
        quantity: parseInt(quantity) || 1,
        note: note || null,
        assignedById: authReq.user?.id || null
      },
      include: { product: { select: productSelectFields } }
    });

    res.status(201).json(pp);
  } catch (error) {
    console.error('Add product to project error:', error);
    res.status(500).json({ error: 'Ürün projeye eklenirken hata oluştu' });
  }
};

// DELETE /api/projects/:id/products/:productId
export const removeProductFromProject = async (req: Request, res: Response) => {
  try {
    const projectId = parseInt(req.params.id);
    const productId = parseInt(req.params.productId);

    if (isNaN(projectId) || isNaN(productId)) {
      return res.status(400).json({ error: 'Geçersiz ID' });
    }

    const pp = await prisma.projectProduct.findUnique({
      where: { projectId_productId: { projectId, productId } }
    });

    if (!pp) return res.status(404).json({ error: 'Proje-ürün ilişkisi bulunamadı' });

    await prisma.projectProduct.delete({ where: { id: pp.id } });

    res.json({ success: true, message: 'Ürün projeden çıkarıldı' });
  } catch (error) {
    console.error('Remove product from project error:', error);
    res.status(500).json({ error: 'Ürün projeden çıkarılırken hata oluştu' });
  }
};

// PUT /api/projects/:id/products/:productId
export const updateProjectProduct = async (req: Request, res: Response) => {
  try {
    const projectId = parseInt(req.params.id);
    const productId = parseInt(req.params.productId);
    const { quantity, note } = req.body;

    if (isNaN(projectId) || isNaN(productId)) {
      return res.status(400).json({ error: 'Geçersiz ID' });
    }

    const pp = await prisma.projectProduct.findUnique({
      where: { projectId_productId: { projectId, productId } }
    });

    if (!pp) return res.status(404).json({ error: 'Proje-ürün ilişkisi bulunamadı' });

    const updated = await prisma.projectProduct.update({
      where: { id: pp.id },
      data: {
        quantity: quantity !== undefined ? parseInt(quantity) : pp.quantity,
        note: note !== undefined ? note : pp.note
      },
      include: { product: { select: productSelectFields } }
    });

    res.json(updated);
  } catch (error) {
    console.error('Update project product error:', error);
    res.status(500).json({ error: 'Proje ürünü güncellenirken hata oluştu' });
  }
};
