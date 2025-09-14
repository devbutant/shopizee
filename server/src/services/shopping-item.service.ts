import { ShoppingItemRepository } from '../repositories/shopping-item.repository';
import { ShoppingItem, CreateShoppingItemData, UpdateShoppingItemData } from '../dto';

export class ShoppingItemService {
  /**
   * Initialiser la table des articles
   */
  public static initializeTable(): void {
    ShoppingItemRepository.initializeTable();
  }

  /**
   * Récupérer tous les articles ou filtrer par statut d'achat
   */
  public static getAllItems(purchased?: boolean): ShoppingItem[] {
    if (purchased !== undefined) {
      return ShoppingItemRepository.findByPurchasedStatus(purchased);
    }
    return ShoppingItemRepository.findAll();
  }

  /**
   * Récupérer un article par ID
   */
  public static getItemById(id: number): ShoppingItem | null {
    const item = ShoppingItemRepository.findById(id);
    return item || null;
  }

  /**
   * Créer un nouvel article
   */
  public static createItem(itemData: CreateShoppingItemData): ShoppingItem {
    // Validation métier
    if (itemData.quantity <= 0) {
      throw new Error('La quantité doit être positive');
    }

    if (!itemData.name.trim()) {
      throw new Error('Le nom de l\'article ne peut pas être vide');
    }

    if (!itemData.unit.trim()) {
      throw new Error('L\'unité ne peut pas être vide');
    }

    return ShoppingItemRepository.create(itemData);
  }

  /**
   * Mettre à jour un article
   */
  public static updateItem(id: number, itemData: UpdateShoppingItemData): ShoppingItem | null {
    // Vérifier que l'article existe
    const existingItem = ShoppingItemRepository.findById(id);
    if (!existingItem) {
      return null;
    }

    // Validation métier
    if (itemData.quantity !== undefined && itemData.quantity <= 0) {
      throw new Error('La quantité doit être positive');
    }

    if (itemData.name !== undefined && !itemData.name.trim()) {
      throw new Error('Le nom de l\'article ne peut pas être vide');
    }

    if (itemData.unit !== undefined && !itemData.unit.trim()) {
      throw new Error('L\'unité ne peut pas être vide');
    }

    return ShoppingItemRepository.update(id, itemData);
  }

  /**
   * Supprimer un article
   */
  public static deleteItem(id: number): boolean {
    return ShoppingItemRepository.delete(id);
  }

  /**
   * Marquer un article comme acheté/non acheté
   */
  public static togglePurchased(id: number): ShoppingItem | null {
    const item = ShoppingItemRepository.findById(id);
    if (!item) {
      return null;
    }
    
    return ShoppingItemRepository.update(id, { purchased: !item.purchased });
  }
}
