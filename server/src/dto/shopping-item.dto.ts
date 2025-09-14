export interface ShoppingItem {
  id?: number;
  name: string;
  quantity: number;
  unit: string;
  purchased: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateShoppingItemData {
  name: string;
  quantity: number;
  unit: string;
  purchased?: boolean;
}

export interface UpdateShoppingItemData {
  name?: string;
  quantity?: number;
  unit?: string;
  purchased?: boolean;
}
