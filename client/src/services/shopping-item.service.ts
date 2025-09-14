/**
 * Service responsible for shopping items API calls
 */

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

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}

export class ShoppingItemService {
  private static readonly BASE_URL = (import.meta as any).env.VITE_API_BASE_URL;

  static async getAllItems(purchased?: boolean): Promise<ShoppingItem[]> {
    try {
      const url = new URL(`${this.BASE_URL}/shopping`);
      if (purchased !== undefined) {
        url.searchParams.append('purchased', purchased.toString());
      }

      const response = await fetch(url.toString());
      const result: ApiResponse<ShoppingItem[]> = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to fetch shopping items');
      }

      return result.data || [];
    } catch (error) {
      console.error('Error fetching shopping items:', error);
      throw error;
    }
  }

  static async togglePurchased(id: number): Promise<ShoppingItem> {
    try {
      const response = await fetch(`${this.BASE_URL}/shopping/${id}/toggle`, {
        method: 'PATCH',
      });

      const result: ApiResponse<ShoppingItem> = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to toggle purchased status');
      }

      return result.data!;
    } catch (error) {
      console.error('Error toggling purchased status:', error);
      throw error;
    }
  }
}
