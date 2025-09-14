import Fastify from 'fastify';
import cors from '@fastify/cors';
import { config } from './utils/config';
import { registerRoutes } from './routes';
import { databaseService } from './services/database.service';
import { ShoppingItemService } from './services/shopping-item.service';

const fastify = Fastify({
  logger: true,
});

async function start(): Promise<void> {
  try {
    // CORS
    await fastify.register(cors, {
      origin: 
        process.env['NODE_ENV'] === 'production' 
        ? [process.env['PROD_APP_URL'] || 'http://localhost:5173'] // pas encore défini
        : [process.env['DEV_APP_URL'] || 'http://localhost:5173'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    });

    // Initialiser la base de données
    await databaseService.initialize();

    // Initialiser les tables
    ShoppingItemService.initializeTable();

    // Enregistrer les routes
    await registerRoutes(fastify);

    // Démarrer le serveur
    await fastify.listen({ port: config.port, host: config.host });
    
    console.log(`🚀 Serveur démarré sur http://${config.host}:${config.port}`);
  } catch (error) {
    console.error('Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
}

// Démarrer l'application
start();