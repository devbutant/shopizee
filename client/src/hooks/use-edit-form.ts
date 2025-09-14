import { useState, useEffect } from 'react';
import { ShoppingItem, UpdateShoppingItem } from '../services/shopping-item.service';

interface UseEditFormProps {
  item: ShoppingItem | null;
  onSave: (id: number, updates: UpdateShoppingItem) => Promise<void>;
  onClose: () => void;
}

export const useEditForm = ({ item, onSave, onClose }: UseEditFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: 1,
    unit: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialiser le formulaire quand l'item change
  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        quantity: item.quantity,
        unit: item.unit
      });
      setError(null);
    }
  }, [item]);

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;

    // Validation
    if (!formData.name.trim()) {
      setError('Le nom de l\'article est requis');
      return;
    }

    if (formData.quantity <= 0) {
      setError('La quantité doit être supérieure à 0');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await onSave(item.id, formData);
      onClose();
    } catch (error) {
      console.error('Failed to update item:', error);
      setError(error instanceof Error ? error.message : 'Erreur lors de la modification de l\'article');
    } finally {
      setIsLoading(false);
    }
  };

  // Gestion des changements dans les champs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value
    }));
    
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (error) setError(null);
  };

  // Gestion de la fermeture du modal
  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return {
    formData,
    isLoading,
    error,
    handleSubmit,
    handleChange,
    handleClose,
    isFormValid: formData.name.trim().length > 0 && formData.quantity > 0
  };
};
