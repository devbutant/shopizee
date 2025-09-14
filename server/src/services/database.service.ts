
import Database from 'better-sqlite3';
import { config } from '../utils/config';
import { DatabaseConfig } from '../types';
import { mkdirSync } from 'fs';
import { dirname } from 'path';

export class DatabaseService {
  private db: Database.Database | null = null;
  private config: DatabaseConfig;

  constructor() {
    this.config = config.database;
  }

  /**
   * Initialise la connexion à la base de données
   */
  public async initialize(): Promise<void> {
    try {
      // Créer le répertoire de la base de données si nécessaire
      const dbDir = dirname(this.config.path);
      mkdirSync(dbDir, { recursive: true });

      // Ouvrir la base de données
      this.db = new Database(this.config.path);
      
      // Activer WAL mode si configuré
      if (this.config.enableWAL) {
        this.db.pragma('journal_mode = WAL');
      }

      // Activer les clés étrangères
      this.db.pragma('foreign_keys = ON');

      // Optimiser les performances
      this.db.pragma('synchronous = NORMAL');
      this.db.pragma('cache_size = 1000');
      this.db.pragma('temp_store = MEMORY');

      console.log(`✅ Base de données SQLite initialisée: ${this.config.path}`);
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation de la base de données:', error);
      throw error;
    }
  }

  /**
   * Obtient l'instance de la base de données
   */
  public getDatabase(): Database.Database {
    if (!this.db) {
      throw new Error('Base de données non initialisée. Appelez initialize() d\'abord.');
    }
    return this.db;
  }

  /**
   * Exécute une requête préparée
   */
  public prepare(sql: string): Database.Statement {
    return this.getDatabase().prepare(sql);
  }

  /**
   * Exécute une requête avec des paramètres
   */
  public run(sql: string, params: any[] = []): Database.RunResult {
    return this.getDatabase().prepare(sql).run(params);
  }

  /**
   * Exécute une requête et retourne le premier résultat
   */
  public get<T = any>(sql: string, params: any[] = []): T | undefined {
    return this.getDatabase().prepare(sql).get(params) as T | undefined;
  }

  /**
   * Exécute une requête et retourne tous les résultats
   */
  public all<T = any>(sql: string, params: any[] = []): T[] {
    return this.getDatabase().prepare(sql).all(params) as T[];
  }

  /**
   * Exécute plusieurs requêtes dans une transaction
   */
  public transaction(queries: Array<{ sql: string; params?: any[] }>): Database.RunResult[] {
    const transaction = this.getDatabase().transaction((queries) => {
      const results: Database.RunResult[] = [];
      for (const query of queries) {
        results.push(this.getDatabase().prepare(query.sql).run(query.params || []));
      }
      return results;
    });
    
    return transaction(queries);
  }

  /**
   * Ferme la connexion à la base de données
   */
  public async close(): Promise<void> {
    if (this.db) {
      this.db.close();
      this.db = null;
      console.log('🔒 Connexion à la base de données fermée');
    }
  }

  /**
   * Vérifie si la base de données est connectée
   */
  public isConnected(): boolean {
    return this.db !== null;
  }
}

// Instance singleton
export const databaseService = new DatabaseService();
