import { Metadata } from 'next';
import { rickAndMortyService } from '@/services';
import { CharacterGrid } from '@/components/character';
import { ErrorMessage } from '@/components/ui';

// Configuración para SSG con cache forzado
export const revalidate = false; // Cache indefinido hasta rebuild

export const metadata: Metadata = {
  title: 'Inicio',
  description: 'Explora todos los personajes del universo de Rick and Morty con carga optimizada',
};

export default async function HomePage() {
  try {
    // Obtener la primera página de personajes con cache forzado (SSG)
    const charactersData = await rickAndMortyService.getAllCharacters(1);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
            🛸 Rick & Morty Explorer
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto mb-6">
            Descubre todos los personajes del multiverso de Rick and Morty. 
            Esta página utiliza <strong className="text-purple-600">Static Site Generation (SSG)</strong> con cache forzado 
            para una carga ultra-rápida.
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full font-medium shadow-lg">
              🚀 SSG - Cache Forzado
            </span>
            <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full font-medium shadow-lg">
              🖼️ Lazy Loading
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold mb-3">
              {charactersData.info.count}
            </div>
            <div className="text-blue-100 font-medium">Total de Personajes</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold mb-3">
              {charactersData.info.pages}
            </div>
            <div className="text-emerald-100 font-medium">Páginas Disponibles</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold mb-3">
              {charactersData.results.length}
            </div>
            <div className="text-purple-100 font-medium">Personajes Mostrados</div>
          </div>
        </div>

        {/* Characters Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Personajes Principales
            </h2>
            <a 
              href="/search" 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-full font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Ver todos →
            </a>
          </div>
          
          <CharacterGrid 
            characters={charactersData.results} 
            priority={true} // Los primeros personajes tendrán priority loading
          />
        </div>

        {/* Technical Details */}
        <div className="mt-16 bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl shadow-xl p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
            🔧 Justificación Técnica - SSG
          </h3>
          <div className="space-y-4 text-slate-700">
            <div className="bg-white rounded-lg p-4 border-l-4 border-emerald-500">
              <p className="font-semibold text-slate-800 mb-2">¿Por qué SSG aquí?</p>
              <p>La página principal muestra contenido que no cambia frecuentemente y debe cargar extremadamente rápido para una buena primera impresión.</p>
            </div>
            <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
              <p className="font-semibold text-slate-800 mb-2">Cache forzado:</p>
              <p>Se usa <code className="bg-slate-100 px-2 py-1 rounded text-purple-600 font-mono">cache: 'force-cache'</code> para asegurar que los datos se almacenen en build time y se sirvan desde CDN.</p>
            </div>
            <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
              <p className="font-semibold text-slate-800 mb-2">Lazy Loading:</p>
              <p>Las imágenes se cargan bajo demanda excepto las primeras 4 que tienen <code className="bg-slate-100 px-2 py-1 rounded text-purple-600 font-mono">priority={true}</code>.</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading characters:', error);
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage
          title="Error al cargar personajes"
          message="No se pudieron cargar los personajes. Por favor, intenta más tarde."
        />
      </div>
    );
  }
}
