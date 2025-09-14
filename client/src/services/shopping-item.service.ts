import { apiClient } from './api-client';

// Types
export interface ShoppingItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  purchased: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateShoppingItem {
  name: string;
  quantity: number;
  unit: string;
  purchased?: boolean;
}

export interface UpdateShoppingItem {
  name?: string;
  quantity?: number;
  unit?: string;
  purchased?: boolean;
}

// Configuration des endpoints
const ENDPOINTS = {
  SHOPPING: '/shopping',
  TOGGLE: (id: number) => `/shopping/${id}/toggle`,
  ITEM: (id: number) => `/shopping/${id}`,
} as const;

// API Functions - Approche fonctionnelle pure
export const getAllItems = async (purchased?: boolean): Promise<ShoppingItem[]> => {
  try {
    const params = purchased !== undefined ? { purchased: purchased.toString() } : undefined;
    return await apiClient.get<ShoppingItem[]>(ENDPOINTS.SHOPPING, params);
  } catch (error) {
    console.error('Error fetching shopping items:', error);
    throw error;
  }
};

export const togglePurchased = async (id: number): Promise<ShoppingItem> => {
  try {
    return await apiClient.patch<ShoppingItem>(ENDPOINTS.TOGGLE(id));
  } catch (error) {
    console.error('Error toggling purchased status:', error);
    throw error;
  }
};

export const deleteItem = async (id: number): Promise<void> => {
  try {
    return await apiClient.delete<void>(ENDPOINTS.ITEM(id));
  } catch (error) {
    console.error('Error deleting shopping item:', error);
    throw error;
  }
};

export const createItem = async (itemData: CreateShoppingItem): Promise<ShoppingItem> => {
  try {
    return await apiClient.post<ShoppingItem>(ENDPOINTS.SHOPPING, itemData);
  } catch (error) {
    console.error('Error creating shopping item:', error);
    throw error;
  }
};

export const updateItem = async (id: number, updates: UpdateShoppingItem): Promise<ShoppingItem> => {
  try {
    return await apiClient.put<ShoppingItem>(ENDPOINTS.ITEM(id), updates);
  } catch (error) {
    console.error('Error updating shopping item:', error);
    throw error;
  }
};
// Export d'un objet pour une API plus claire
export const shoppingItemApi = {
  getAllItems,
  createItem,
  togglePurchased,
  deleteItem,
  updateItem,
} as const;

