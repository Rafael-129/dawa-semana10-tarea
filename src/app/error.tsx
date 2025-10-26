'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <div className="text-9xl mb-8">⚠️</div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-4">
          ¡Algo salió mal!
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Parece que hubo un problema al cargar el personaje. 
          Esto podría ser un error temporal de la API o de conexión.
        </p>
        
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center mb-8">
          <button
            onClick={reset}
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium shadow-lg"
          >
            🔄 Intentar de nuevo
          </button>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 font-medium shadow-lg"
          >
            🏠 Volver al inicio
          </Link>
          <Link
            href="/search"
            className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 font-medium shadow-lg"
          >
            🔍 Buscar personajes
          </Link>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            💡 Detalles técnicos
          </h2>
          <div className="text-left space-y-3 text-slate-700">
            <p><strong>Error:</strong> {error.message}</p>
            {error.digest && (
              <p><strong>ID del error:</strong> {error.digest}</p>
            )}
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Posibles causas:</strong>
              </p>
              <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                <li>• El personaje con ese ID no existe</li>
                <li>• Problema temporal con la API de Rick and Morty</li>
                <li>• Error de conexión a internet</li>
                <li>• El servidor está temporalmente sobrecargado</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}