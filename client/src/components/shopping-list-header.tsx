interface ShoppingListHeaderProps {
  remainingCount: number;
  purchasedCount: number;
  onAddItem: () => void;
}

export const ShoppingListHeader = ({ remainingCount, purchasedCount, onAddItem }: ShoppingListHeaderProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">Shopizee</h1>
          <button
            onClick={onAddItem}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Ajouter
          </button>
        </div>
        <div className="flex justify-center space-x-6 mt-2 text-sm text-slate-600">
          <span>{remainingCount} restants</span>
          <span>•</span>
          <span>{purchasedCount} achetés</span>
        </div>
      </div>
    </div>
  );
};
