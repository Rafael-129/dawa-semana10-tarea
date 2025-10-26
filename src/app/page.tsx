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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🛸 Rick & Morty Explorer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Descubre todos los personajes del multiverso de Rick and Morty. 
            Esta página utiliza <strong>Static Site Generation (SSG)</strong> con cache forzado 
            para una carga ultra-rápida.
          </p>
          <div className="flex justify-center space-x-4 text-sm text-gray-500">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
              🚀 SSG - Cache Forzado
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              🖼️ Lazy Loading
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {charactersData.info.count}
            </div>
            <div className="text-gray-600">Total de Personajes</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {charactersData.info.pages}
            </div>
            <div className="text-gray-600">Páginas Disponibles</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {charactersData.results.length}
            </div>
            <div className="text-gray-600">Personajes Mostrados</div>
          </div>
        </div>

        {/* Characters Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Personajes Principales
            </h2>
            <a 
              href="/search" 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
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
        <div className="mt-16 bg-white rounded-xl shadow-md p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            🔧 Justificación Técnica - SSG
          </h3>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>¿Por qué SSG aquí?</strong> La página principal muestra contenido que no cambia 
              frecuentemente y debe cargar extremadamente rápido para una buena primera impresión.
            </p>
            <p>
              <strong>Cache forzado:</strong> Se usa <code className="bg-gray-100 px-2 py-1 rounded">cache: 'force-cache'</code> 
              para asegurar que los datos se almacenen en build time y se sirvan desde CDN.
            </p>
            <p>
              <strong>Lazy Loading:</strong> Las imágenes se cargan bajo demanda excepto las primeras 4 
              que tienen <code className="bg-gray-100 px-2 py-1 rounded">priority={true}</code>.
            </p>
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
