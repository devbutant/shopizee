import { FastifyRequest, FastifyReply } from 'fastify';
import { ShoppingItemService } from '../services/shopping-item.service';
import { CreateShoppingItemData, UpdateShoppingItemData } from '../dto';

interface ShoppingItemParams {
  id: string;
}

interface ShoppingItemQuery {
  purchased?: string;
}

export class ShoppingController {
  /**
   * Récupérer tous les articles de la liste de courses
   */
  public static async getAllItems(request: FastifyRequest<{ Querystring: ShoppingItemQuery }>, reply: FastifyReply) {
    try {
      const { purchased } = request.query;
      
      const isPurchased = purchased !== undefined ? purchased === 'true' : undefined;
      const items = ShoppingItemService.getAllItems(isPurchased);

      reply.code(200).send({
        success: true,
        data: items,
        count: items.length
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        success: false,
        error: 'Erreur lors de la récupération des articles'
      });
    }
  }

  /**
   * Récupérer un article par son ID
   */
  public static async getItemById(request: FastifyRequest<{ Params: ShoppingItemParams }>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const itemId = parseInt(id, 10);

      if (isNaN(itemId)) {
        reply.code(400).send({
          success: false,
          error: 'ID invalide'
        });
        return;
      }

      const item = ShoppingItemService.getItemById(itemId);

      if (!item) {
        reply.code(404).send({
          success: false,
          error: 'Article non trouvé'
        });
        return;
      }

      reply.code(200).send({
        success: true,
        data: item
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        success: false,
        error: 'Erreur lors de la récupération de l\'article'
      });
    }
  }

  /**
   * Créer un nouvel article
   */
  public static async createItem(request: FastifyRequest<{ Body: CreateShoppingItemData }>, reply: FastifyReply) {
    try {
      const itemData = request.body;

      // Validation des données
      if (!itemData.name || !itemData.quantity || !itemData.unit) {
        reply.code(400).send({
          success: false,
          error: 'Les champs name, quantity et unit sont requis'
        });
        return;
      }

      try {
        const newItem = ShoppingItemService.createItem(itemData);

        reply.code(201).send({
          success: true,
          data: newItem,
          message: 'Article ajouté à la liste avec succès'
        });
      } catch (validationError) {
        reply.code(400).send({
          success: false,
          error: validationError instanceof Error ? validationError.message : 'Erreur de validation'
        });
        return;
      }
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        success: false,
        error: 'Erreur lors de la création de l\'article'
      });
    }
  }

  /**
   * Mettre à jour un article
   */
  public static async updateItem(
    request: FastifyRequest<{ 
      Params: ShoppingItemParams; 
      Body: UpdateShoppingItemData 
    }>, 
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;
      const itemId = parseInt(id, 10);
      const updateData = request.body;

      if (isNaN(itemId)) {
        reply.code(400).send({
          success: false,
          error: 'ID invalide'
        });
        return;
      }

      try {
        const updatedItem = ShoppingItemService.updateItem(itemId, updateData);

        if (!updatedItem) {
          reply.code(404).send({
            success: false,
            error: 'Article non trouvé'
          });
          return;
        }

        reply.code(200).send({
          success: true,
          data: updatedItem,
          message: 'Article mis à jour avec succès'
        });
      } catch (validationError) {
        reply.code(400).send({
          success: false,
          error: validationError instanceof Error ? validationError.message : 'Erreur de validation'
        });
        return;
      }
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        success: false,
        error: 'Erreur lors de la mise à jour de l\'article'
      });
    }
  }

  /**
   * Supprimer un article
   */
  public static async deleteItem(request: FastifyRequest<{ Params: ShoppingItemParams }>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const itemId = parseInt(id, 10);

      if (isNaN(itemId)) {
        reply.code(400).send({
          success: false,
          error: 'ID invalide'
        });
        return;
      }

      const deleted = ShoppingItemService.deleteItem(itemId);

      if (!deleted) {
        reply.code(404).send({
          success: false,
          error: 'Article non trouvé'
        });
        return;
      }

      reply.code(200).send({
        success: true,
        message: 'Article supprimé avec succès'
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        success: false,
        error: 'Erreur lors de la suppression de l\'article'
      });
    }
  }

  /**
   * Marquer un article comme acheté/non acheté
   */
  public static async togglePurchased(request: FastifyRequest<{ Params: ShoppingItemParams }>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const itemId = parseInt(id, 10);

      if (isNaN(itemId)) {
        reply.code(400).send({
          success: false,
          error: 'ID invalide'
        });
        return;
      }

      const updatedItem = ShoppingItemService.togglePurchased(itemId);

      if (!updatedItem) {
        reply.code(404).send({
          success: false,
          error: 'Article non trouvé'
        });
        return;
      }

      reply.code(200).send({
        success: true,
        data: updatedItem,
        message: `Article marqué comme ${updatedItem.purchased ? 'acheté' : 'non acheté'}`
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        success: false,
        error: 'Erreur lors de la mise à jour du statut d\'achat'
      });
    }
  }
}
