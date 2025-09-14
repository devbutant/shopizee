import { useState, useEffect } from 'react';
import { ShoppingItemService, ShoppingItem } from '../services/shopping-item.service';

export const useShoppingItems = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadItems = async (purchased?: boolean) => {
    try {
      setLoading(true);
      setError(null);
      const fetchedItems = await ShoppingItemService.getAllItems(purchased);
      setItems(fetchedItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load items');
    } finally {
      setLoading(false);
    }
  };

  const togglePurchased = async (id: number) => {
    try {
      setError(null);
      const updatedItem = await ShoppingItemService.togglePurchased(id);
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

  useEffect(() => {
    loadItems();
  }, []);

  return {
    items,
    loading,
    error,
    loadItems,
    togglePurchased
  };
};
