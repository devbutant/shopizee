import { ShoppingItem } from '../services/shopping-item.service';

interface UseItemActionsProps {
  onTogglePurchased: (id: number) => Promise<ShoppingItem>;
  onDeleteItem: (id: number) => Promise<void>;
  onEditItem: (item: ShoppingItem) => void;
}

export const useItemActions = ({ onTogglePurchased, onDeleteItem, onEditItem }: UseItemActionsProps) => {
  const handleTogglePurchased = async (id: number) => {
    try {
      await onTogglePurchased(id);
    } catch (error) {
      console.error('Failed to toggle purchased status:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await onDeleteItem(id);
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const handleEdit = (item: ShoppingItem) => {
    onEditItem(item);
  };

  return {
    handleTogglePurchased,
    handleDelete,
    handleEdit
  };
};
