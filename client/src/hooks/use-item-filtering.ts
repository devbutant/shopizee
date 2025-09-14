import { ShoppingItem } from '../services/shopping-item.service';

export const useItemFiltering = (items: ShoppingItem[]) => {
  const remainingItems = items.filter(item => !item.purchased);
  const purchasedItems = items.filter(item => item.purchased);

  return {
    remainingItems,
    purchasedItems
  };
};
