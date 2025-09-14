import { useState, useEffect } from 'react';
import { getAllItems, togglePurchased, deleteItem, updateItem, ShoppingItem, UpdateShoppingItem } from '../services/shopping-item.service';

export const useShoppingItems = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadItems = async (purchased?: boolean) => {
    try {
      setLoading(true);
      setError(null);
      const fetchedItems = await getAllItems(purchased);
      setItems(fetchedItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load items');
    } finally {
      setLoading(false);
    }
  };

  const togglePurchasedItem = async (id: number) => {
    try {
      setError(null);
      const updatedItem = await togglePurchased(id);
      setItems(prevItems => 
        prevItems.map(item => item.id === id ? updatedItem : item)
      );
      return updatedItem;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to toggle purchased status';
      setError(errorMessage);
      throw err;
    }
  };

  const deleteItemById = async (id: number) => {
    try {
      setError(null);
      await deleteItem(id);
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete item';
      setError(errorMessage);
      throw err;
    }
  };

  const updateItemById = async (id: number, updates: UpdateShoppingItem) => {
    try {
      setError(null);
      const updatedItem = await updateItem(id, updates);
      setItems(prevItems => 
        prevItems.map(item => item.id === id ? updatedItem : item)
      );
      return updatedItem;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update item';
      setError(errorMessage);
      throw err;
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  return {
    items,
    loading,
    error,
    loadItems,
    togglePurchased: togglePurchasedItem,
    deleteItem: deleteItemById,
    updateItem: updateItemById
  };
};
