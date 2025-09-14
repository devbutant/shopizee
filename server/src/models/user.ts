import { databaseService } from '../services/database.service';

export interface User {
  id?: number;
  name: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateUserData {
  name: string;
  email: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
}

export class UserModel {
  /**
   * Créer la table users si elle n'existe pas
   */
  public static initializeTable(): void {
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    databaseService.run(createTableSQL);
    console.log('✅ Table users initialisée');
  }

  /**
   * Créer un nouvel utilisateur
   */
  public static create(userData: CreateUserData): User {
    const insertSQL = `
      INSERT INTO users (name, email, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
    `;
    
    const result = databaseService.run(insertSQL, [userData.name, userData.email]);
    
    return {
      id: result.lastInsertRowid as number,
      name: userData.name,
      email: userData.email,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  /**
   * Récupérer tous les utilisateurs
   */
  public static findAll(): User[] {
    const selectSQL = 'SELECT * FROM users ORDER BY created_at DESC';
    return databaseService.all<User>(selectSQL);
  }

  /**
   * Récupérer un utilisateur par ID
   */
  public static findById(id: number): User | undefined {
    const selectSQL = 'SELECT * FROM users WHERE id = ?';
    return databaseService.get<User>(selectSQL, [id]);
  }

  /**
   * Récupérer un utilisateur par email
   */
  public static findByEmail(email: string): User | undefined {
    const selectSQL = 'SELECT * FROM users WHERE email = ?';
    return databaseService.get<User>(selectSQL, [email]);
  }

  /**
   * Mettre à jour un utilisateur
   */
  public static update(id: number, userData: UpdateUserData): User | null {
    const updateFields: string[] = [];
    const values: any[] = [];

    if (userData.name !== undefined) {
      updateFields.push('name = ?');
      values.push(userData.name);
    }

    if (userData.email !== undefined) {
      updateFields.push('email = ?');
      values.push(userData.email);
    }

    if (updateFields.length === 0) {
      return this.findById(id) || null;
    }

    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const updateSQL = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
    databaseService.run(updateSQL, values);

    return this.findById(id) || null;
  }

  /**
   * Supprimer un utilisateur
   */
  public static delete(id: number): boolean {
    const deleteSQL = 'DELETE FROM users WHERE id = ?';
    const result = databaseService.run(deleteSQL, [id]);
    return result.changes > 0;
  }

  /**
   * Compter le nombre d'utilisateurs
   */
  public static count(): number {
    const countSQL = 'SELECT COUNT(*) as count FROM users';
    const result = databaseService.get<{ count: number }>(countSQL);
    return result?.count || 0;
  }
}
