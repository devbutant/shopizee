import { FastifyInstance } from 'fastify';
import { shoppingRoutes } from './shopping-routes';

export async function registerRoutes(fastify: FastifyInstance): Promise<void> {
  // Page d'accueil avec listing des routes
  fastify.get('/', async (_request, reply) => {
    reply.code(200).send({
      message: "API Liste de Courses",
      version: "1.0.0",
      routes: [
        {
          method: "GET",
          path: "/",
          description: "Page d'accueil avec listing des routes"
        },
        {
          method: "GET",
          path: "/shopping",
          description: "Récupérer tous les articles de la liste de courses"
        },
        {
          method: "GET",
          path: "/shopping/:id", 
          description: "Récupérer un article par ID"
        },
        {
          method: "POST",
          path: "/shopping",
          description: "Créer un nouvel article"
        },
        {
          method: "PUT",
          path: "/shopping/:id",
          description: "Mettre à jour un article"
        },
        {
          method: "PATCH",
          path: "/shopping/:id/toggle",
          description: "Marquer comme acheté/non acheté"
        },
        {
          method: "DELETE",
          path: "/shopping/:id",
          description: "Supprimer un article"
        },
      ]
    });
  });

  // Routes fonctionnelles
  await fastify.register(shoppingRoutes);
}
