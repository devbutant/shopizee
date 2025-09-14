interface ErrorStateProps {
  error: string;
}

export const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <div className="h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">📝</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Oups !</h2>
        <p className="text-slate-600 mb-6">{error}</p>
        <button 
          onClick={ (() => window.location.reload())}
          className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
};
