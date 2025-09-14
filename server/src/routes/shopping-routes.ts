import { FastifyInstance } from 'fastify';
import { ShoppingController } from '../controllers/shopping-controller';

export async function shoppingRoutes(fastify: FastifyInstance) {
  // GET /shopping - Récupérer tous les articles
  fastify.get('/shopping', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          purchased: { type: 'string', enum: ['true', 'false'] }
        }
      }
    }
  }, ShoppingController.getAllItems);

  // GET /shopping/:id - Récupérer un article par ID
  fastify.get('/shopping/:id', ShoppingController.getItemById);

  // POST /shopping - Créer un nouvel article
  fastify.post('/shopping', {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'quantity', 'unit'],
        properties: {
          name: { type: 'string', minLength: 1 },
          quantity: { type: 'number', minimum: 1 },
          unit: { type: 'string', minLength: 1 },
          purchased: { type: 'boolean' }
        }
      }
    }
  }, ShoppingController.createItem);

  // PUT /shopping/:id - Mettre à jour un article
  fastify.put('/shopping/:id', {
    schema: {
      body: {
        type: 'object',
        properties: {
          name: { type: 'string', minLength: 1 },
          quantity: { type: 'number', minimum: 1 },
          unit: { type: 'string', minLength: 1 },
          purchased: { type: 'boolean' }
        }
      }
    }
  }, ShoppingController.updateItem);

  // PATCH /shopping/:id/toggle - Marquer un article comme acheté/non acheté
  fastify.patch('/shopping/:id/toggle', ShoppingController.togglePurchased);

  // DELETE /shopping/:id - Supprimer un article
  fastify.delete('/shopping/:id', ShoppingController.deleteItem);
}
