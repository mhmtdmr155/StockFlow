export interface Category {
  id: number;
  name: string;
  icon?: string | null;
  color?: string | null;
  parentId?: number | null;
  formSchema?: any;
  productCount?: number;
}

export interface Product {
  id: number;
  categoryId: number;
  productCode: string;
  materialCode?: string | null;
  name: string;
  description?: string | null;
  stockQuantity: number;
  minimumStock: number;
  location?: string | null;
  attributes: any;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface StockMovement {
  id: number;
  productId: number;
  userId: number;
  changeAmount: number;
  movementType: 'IN' | 'OUT';
  reason: string | null;
  userName?: string; // resolved on frontend for display
  createdAt: string;
}

export interface User {
  id: number;
  username: string;
  role: 'ADMIN' | 'USER';
  isActive: boolean;
}

export interface Notification {
  id: number;
  productId: number;
  message: string;
  isRead: boolean;
  createdAt: string;
  product?: {
    name: string;
    productCode: string;
  };
}
