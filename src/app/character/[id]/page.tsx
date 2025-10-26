import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { rickAndMortyService } from '@/services';
import { CharacterDetail } from '@/components/character';
import { generateCharacterMetadata } from '@/utils';
import { StaticParams } from '@/types';

// Generar rutas estáticas para los personajes más populares
export async function generateStaticParams(): Promise<StaticParams[]> {
  try {
    // Generar solo los primeros 10 personajes para el build inicial
    // Los demás se generarán bajo demanda con ISR
    return Array.from({ length: 10 }, (_, i) => ({
      id: (i + 1).toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    // Retornar al menos algunos parámetros básicos
    return [
      { id: '1' },
      { id: '2' },
      { id: '3' },
    ];
  }
}

// Generar metadatos dinámicos
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const { id } = await params;
    const character = await rickAndMortyService.getCharacterById(id);
    return generateCharacterMetadata(character);
  } catch (error) {
    return {
      title: 'Personaje no encontrado',
      description: 'El personaje que buscas no existe',
    };
  }
}

export default async function CharacterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log('Loading character with ID:', id); // Debug log
  
  try {
    // Validar que el ID sea un número válido
    const characterId = parseInt(id);
    if (isNaN(characterId) || characterId < 1) {
      console.error('Invalid character ID:', id);
      notFound();
    }

    const character = await rickAndMortyService.getCharacterById(characterId);
    console.log('Character loaded successfully:', character.name); // Debug log

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-gray-700 transition-colors">
                Inicio
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <Link href="/search" className="hover:text-gray-700 transition-colors">
                Buscar
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium">{character.name}</span>
            </li>
          </ol>
        </nav>

        {/* Character Detail */}
        <CharacterDetail character={character} />

        {/* Technical Info */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            🔧 Justificación Técnica - ISR
          </h3>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>¿Por qué ISR aquí?</strong> Los detalles de personajes cambian ocasionalmente 
              (nuevos episodios) pero necesitan ser rápidos de cargar.
            </p>
            <p>
              <strong>generateStaticParams:</strong> Pre-genera las rutas de los primeros 100 personajes 
              más populares en build time. Los demás se generan bajo demanda.
            </p>
            <p>
              <strong>Revalidación:</strong> Los datos se actualizan cada 10 días 
              (<code className="bg-gray-100 px-2 py-1 rounded">revalidate: 864000</code> segundos).
            </p>
            <p>
              <strong>Fallback:</strong> Next.js genera automáticamente páginas para personajes 
              no incluidos en generateStaticParams cuando se solicitan por primera vez.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            href="/search"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            ← Volver a búsqueda
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            🏠 Inicio
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading character with ID:', id, error);
    
    // Si es un error de "not found", mostrar 404
    if (error instanceof Error && error.message.includes('not found')) {
      notFound();
    }
    
    // Para otros errores, mostrar página de error genérica
    throw error; // Next.js manejará esto con error.tsx
  }
}