interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorMessage({ 
  title = 'Error', 
  message, 
  onRetry, 
  className = '' 
}: ErrorMessageProps) {
  return (
    <div className={`flex flex-col items-center justify-center min-h-[400px] space-y-4 text-center ${className}`}>
      <div className="text-6xl">😵</div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Intentar de nuevo
        </button>
      )}
    </div>
  );
}

export function NotFound({ 
  title = 'No encontrado', 
  message = 'El contenido que buscas no existe o ha sido eliminado.',
  onGoBack 
}: {
  title?: string;
  message?: string;
  onGoBack?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-center">
      <div className="text-6xl">🔍</div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 max-w-md">{message}</p>
      {onGoBack && (
        <button
          onClick={onGoBack}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Volver
        </button>
      )}
    </div>
  );
}