import { ShoppingItem } from '../services/shopping-item.service';

interface ShoppingItemCardProps {
  item: ShoppingItem;
  onTogglePurchased: (id: number) => void;
  onEdit: (item: ShoppingItem) => void;
  onDelete: (id: number) => void;
}

export const ShoppingItemCard = ({ item, onTogglePurchased, onEdit, onDelete }: ShoppingItemCardProps) => {
  const isPurchased = item.purchased;

  return (
    <div
      className={`rounded-xl p-4 border border-slate-200 cursor-pointer transition-all duration-200 ${
        isPurchased
          ? 'bg-slate-50 opacity-75 hover:opacity-90'
          : 'bg-white shadow-sm hover:shadow-md'
      }`}
      onClick={() => onTogglePurchased(item.id)}
    >
      <div className="flex items-center space-x-4">
        {/* Checkbox */}
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
          isPurchased
            ? 'bg-emerald-500'
            : 'border-2 border-slate-300 hover:border-emerald-500'
        }`}>
          {isPurchased ? (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <div className="w-2 h-2 rounded-full bg-transparent hover:bg-emerald-500 transition-colors"></div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className={`font-medium text-lg ${
            isPurchased 
              ? 'text-slate-600 line-through' 
              : 'text-slate-800'
          }`}>
            {item.name}
          </div>
          <div className={`text-sm ${
            isPurchased ? 'text-slate-400' : 'text-slate-500'
          }`}>
            {item.quantity} {item.unit}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-2">
          {/* Edit button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(item);
            }}
            className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
            title="Modifier"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          {/* Delete button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Supprimer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
