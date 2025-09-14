import { useState } from 'react';
import { CreateShoppingItem } from '../services/shopping-item.service';

interface UseAddModalProps {
  onCreateItem: (itemData: CreateShoppingItem) => Promise<any>;
}

export const useAddModal = ({ onCreateItem }: UseAddModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSave = async (itemData: CreateShoppingItem) => {
    await onCreateItem(itemData);
    closeModal();
  };

  return {
    isOpen,
    openModal,
    closeModal,
    handleSave
  };
};
