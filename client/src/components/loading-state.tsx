export const LoadingState = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse">
          <div className="w-12 h-12 bg-slate-300 rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Chargement de votre liste de courses...</p>
        </div>
      </div>
    </div>
  );
};
