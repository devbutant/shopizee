import { databaseService } from '../services/database.service';
import { ShoppingItem, CreateShoppingItemData, UpdateShoppingItemData } from '../dto';

export class ShoppingItemRepository {
  /**
   * Créer la table shopping_items si elle n'existe pas
   */
  public static initializeTable(): void {
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS shopping_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        unit TEXT NOT NULL DEFAULT 'pcs',
        purchased BOOLEAN NOT NULL DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    databaseService.run(createTableSQL);
    console.log('✅ Table shopping_items initialisée');
  }

  /**
   * Créer un nouvel item de liste de courses
   */
  public static create(itemData: CreateShoppingItemData): ShoppingItem {
    const insertSQL = `
      INSERT INTO shopping_items (name, quantity, unit, purchased, updated_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;
    
    const purchased = itemData.purchased ?? false;
    const result = databaseService.run(insertSQL, [itemData.name, itemData.quantity, itemData.unit, purchased ? 1 : 0]);
    
    return {
      id: result.lastInsertRowid as number,
      name: itemData.name,
      quantity: itemData.quantity,
      unit: itemData.unit,
      purchased: purchased,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  /**
   * Récupérer tous les articles de liste de courses
   */
  public static findAll(): ShoppingItem[] {
    const selectSQL = 'SELECT * FROM shopping_items ORDER BY purchased ASC, created_at DESC';
    const items = databaseService.all<any>(selectSQL);
    return items.map(item => ({
      ...item,
      purchased: Boolean(item.purchased)
    }));
  }

  /**
   * Récupérer un article par ID
   */
  public static findById(id: number): ShoppingItem | undefined {
    const selectSQL = 'SELECT * FROM shopping_items WHERE id = ?';
    const item = databaseService.get<any>(selectSQL, [id]);
    if (!item) return undefined;
    return {
      ...item,
      purchased: Boolean(item.purchased)
    };
  }

  /**
   * Récupérer les articles par statut d'achat
   */
  public static findByPurchasedStatus(purchased: boolean): ShoppingItem[] {
    const selectSQL = 'SELECT * FROM shopping_items WHERE purchased = ? ORDER BY created_at DESC';
    const items = databaseService.all<any>(selectSQL, [purchased ? 1 : 0]);
    return items.map(item => ({
      ...item,
      purchased: Boolean(item.purchased)
    }));
  }

  /**
   * Mettre à jour un article de liste de courses
   */
  public static update(id: number, itemData: UpdateShoppingItemData): ShoppingItem | null {
    const updateFields: string[] = [];
    const values: any[] = [];

    if (itemData.name !== undefined) {
      updateFields.push('name = ?');
      values.push(itemData.name);
    }

    if (itemData.quantity !== undefined) {
      updateFields.push('quantity = ?');
      values.push(itemData.quantity);
    }

    if (itemData.unit !== undefined) {
      updateFields.push('unit = ?');
      values.push(itemData.unit);
    }

    if (itemData.purchased !== undefined) {
      updateFields.push('purchased = ?');
      values.push(itemData.purchased ? 1 : 0);
    }

    if (updateFields.length === 0) {
      return this.findById(id) || null;
    }

    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const updateSQL = `UPDATE shopping_items SET ${updateFields.join(', ')} WHERE id = ?`;
    databaseService.run(updateSQL, values);

    return this.findById(id) || null;
  }

  /**
   * Supprimer un article de liste de courses
   */
  public static delete(id: number): boolean {
    const deleteSQL = 'DELETE FROM shopping_items WHERE id = ?';
    const result = databaseService.run(deleteSQL, [id]);
    return result.changes > 0;
  }

  /**
   * Compter le nombre d'articles
   */
  public static count(): number {
    const countSQL = 'SELECT COUNT(*) as count FROM shopping_items';
    const result = databaseService.get<{ count: number }>(countSQL);
    return result?.count || 0;
  }

  /**
   * Compter les articles par statut d'achat
   */
  public static countByPurchasedStatus(purchased: boolean): number {
    const countSQL = 'SELECT COUNT(*) as count FROM shopping_items WHERE purchased = ?';
    const result = databaseService.get<{ count: number }>(countSQL, [purchased ? 1 : 0]);
    return result?.count || 0;
  }
}
