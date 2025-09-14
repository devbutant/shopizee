import { useState } from 'react';
import { ShoppingItem, UpdateShoppingItem } from '../services/shopping-item.service';

export const useEditModal = (onSave: (id: number, updates: UpdateShoppingItem) => Promise<ShoppingItem>) => {
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (item: ShoppingItem) => {
    setEditingItem(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditingItem(null);
  };

  const handleSave = async (id: number, updates: UpdateShoppingItem) => {
    try {
      await onSave(id, updates);
      closeModal();
    } catch (error) {
      console.error('Failed to update item:', error);
      // Le modal reste ouvert en cas d'erreur pour permettre à l'utilisateur de réessayer
    }
  };

  return {
    editingItem,
    isOpen,
    openModal,
    closeModal,
    handleSave
  };
};
