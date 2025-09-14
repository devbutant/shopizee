interface ShoppingListHeaderProps {
  remainingCount: number;
  purchasedCount: number;
}

export const ShoppingListHeader = ({ remainingCount, purchasedCount }: ShoppingListHeaderProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold text-slate-800 text-center">Shopizee</h1>
        <div className="flex justify-center space-x-6 mt-2 text-sm text-slate-600">
          <span>{remainingCount} restants</span>
          <span>•</span>
          <span>{purchasedCount} achetés</span>
        </div>
      </div>
    </div>
  );
};
