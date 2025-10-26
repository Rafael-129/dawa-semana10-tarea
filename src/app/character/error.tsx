'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function CharacterError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Character loading error:', error);
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <div className="text-9xl mb-8">👽</div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-4">
          ¡Personaje perdido en el multiverso!
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          No pudimos cargar la información de este personaje. 
          Podría estar en una dimensión paralela o la API está teniendo problemas.
        </p>
        
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center mb-8">
          <button
            onClick={reset}
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg"
          >
            🔄 Intentar cargar de nuevo
          </button>
          <Link
            href="/search"
            className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg hover:from-cyan-600 hover:to-cyan-700 transition-all duration-300 font-medium shadow-lg"
          >
            🔍 Buscar otros personajes
          </Link>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 font-medium shadow-lg"
          >
            🏠 Volver al inicio
          </Link>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            🔧 ISR - Manejo de Errores
          </h2>
          <div className="text-left space-y-3 text-slate-700">
            <p>
              <strong>Error detectado:</strong> {error.message}
            </p>
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 font-semibold mb-2">
                Información técnica:
              </p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Esta página usa <strong>ISR</strong> (Incremental Static Regeneration)</li>
                <li>• Los datos se revalidan cada 10 días automáticamente</li>
                <li>• Si un personaje no existe, se genera una página 404</li>
                <li>• Los errores de red se manejan graciosamente</li>
              </ul>
            </div>
            {error.digest && (
              <p className="text-xs text-slate-500 mt-4">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}