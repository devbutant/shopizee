import Fastify from 'fastify';
import { config } from './utils/config';
import { registerRoutes } from './routes';
import { databaseService } from './services/database.service';
import { ShoppingItemService } from './services/shopping-item.service';

const fastify = Fastify({
  logger: true,
});

async function start(): Promise<void> {
  try {
    // Initialiser la base de données
    await databaseService.initialize();

    // Initialiser les tables
    ShoppingItemService.initializeTable();

    // Enregistrer les routes
    await registerRoutes(fastify);

    // Démarrer le serveur
    await fastify.listen({ port: config.port, host: config.host });
    
    console.log(`🚀 Serveur démarré sur http://${config.host}:${config.port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

// Gestionnaire pour l'arrêt propre du serveur
process.on('SIGINT', async () => {
  console.log('\n🛑 Arrêt du serveur...');
  await databaseService.close();
  await fastify.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Arrêt du serveur...');
  await databaseService.close();
  await fastify.close();
  process.exit(0);
});

start().catch((err) => {
  console.error('Erreur lors du démarrage:', err);
  process.exit(1);
});
