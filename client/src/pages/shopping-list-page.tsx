import { useShoppingItems, useEditModal, useAddModal } from '../hooks';
import { useItemActions } from '../hooks/use-item-actions';
import { useItemFiltering } from '../hooks/use-item-filtering';
import { LoadingState } from '../components/loading-state';
import { ErrorState } from '../components/error-state';
import { EmptyState } from '../components/empty-state';
import { ShoppingListHeader } from '../components/shopping-list-header';
import { ShoppingItemCard } from '../components/shopping-item-card';
import { EditItemModal } from '../components/edit-item-modal';
import { AddItemModal } from '../components/add-item-modal';

export const ShoppingListPage = () => {
  const { items, loading, error, createItem, togglePurchased, deleteItem, updateItem } = useShoppingItems();
  
  const { purchasedItems, remainingItems } = useItemFiltering(items);
  
  const { editingItem, isOpen: isEditModalOpen, openModal, closeModal, handleSave } = useEditModal(updateItem);
  
  const { isOpen: isAddModalOpen, openModal: openAddModal, closeModal: closeAddModal, handleSave: handleAddSave } = useAddModal({
    onCreateItem: async (itemData) => {
      await createItem(itemData);
    }
  });
  
  const { handleTogglePurchased, handleDelete, handleEdit } = useItemActions({
    onTogglePurchased: togglePurchased,
    onDeleteItem: deleteItem,
    onEditItem: openModal
  });

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      <ShoppingListHeader 
        remainingCount={remainingItems.length} 
        purchasedCount={purchasedItems.length}
        onAddItem={openAddModal}
      />

      {/* Content with scroll */}
      <div className="h-[calc(100vh-80px)] overflow-y-auto container mx-auto">
        <div className="px-6 py-6 space-y-6">
          
          {/* Remaining Items */}
          {remainingItems.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-700 mb-4">À acheter</h2>
              {remainingItems.map((item) => (
                <ShoppingItemCard
                  key={item.id}
                  item={item}
                  onTogglePurchased={handleTogglePurchased}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {/* Purchased Items */}
          {purchasedItems.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-500 mb-4">Achetés</h2>
              {purchasedItems.map((item) => (
                <ShoppingItemCard
                  key={item.id}
                  item={item}
                  onTogglePurchased={handleTogglePurchased}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {items.length === 0 && <EmptyState />}

          {/* Bottom padding for better scrolling */}
          <div className="h-8"></div>
        </div>
      </div>

      {/* Subtle gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none"></div>

      {/* Edit Modal */}
      <EditItemModal
        item={editingItem}
        isOpen={isEditModalOpen}
        onClose={closeModal}
        onSave={handleSave}
      />

      {/* Add Modal */}
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onSave={handleAddSave}
      />
    </div>
  );
};
