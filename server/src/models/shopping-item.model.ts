/**
 * Modèle de données pour un article de liste de courses
 */
export interface ShoppingItemModel {
  id?: number;
  name: string;
  quantity: number;
  unit: string;
  purchased: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * Données pour créer un nouvel article
 */
export interface CreateShoppingItemModel {
  name: string;
  quantity: number;
  unit: string;
  purchased?: boolean;
}

/**
 * Données pour mettre à jour un article
 */
export interface UpdateShoppingItemModel {
  name?: string;
  quantity?: number;
  unit?: string;
  purchased?: boolean;
}