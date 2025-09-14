import { ShoppingItem } from '../services/shopping-item.service';

interface ShoppingItemCardProps {
  item: ShoppingItem;
  onTogglePurchased: (id: number) => void;
}

export const ShoppingItemCard = ({ item, onTogglePurchased }: ShoppingItemCardProps) => {
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

        {/* Arrow (only for non-purchased items) */}
        {!isPurchased && (
          <div className="text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
