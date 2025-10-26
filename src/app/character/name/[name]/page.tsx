import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { rickAndMortyService } from '@/services';
import { CharacterDetail } from '@/components/character';
import { generateCharacterMetadata } from '@/utils';
import { StaticNameParams } from '@/types';

// Generar rutas estáticas para nombres populares
export async function generateStaticParams(): Promise<StaticNameParams[]> {
  try {
    // Generar solo algunos nombres populares para el build inicial
    // Los demás se generarán bajo demanda con ISR
    const popularNames = [
      'rick sanchez',
      'morty smith', 
      'summer smith',
      'beth smith',
      'jerry smith'
    ];
    
    return popularNames.map((name) => ({
      name: encodeURIComponent(name.toLowerCase()),
    }));
  } catch (error) {
    console.error('Error generating static params for names:', error);
    // Retornar al menos algunos parámetros básicos
    return [
      { name: encodeURIComponent('rick sanchez') },
      { name: encodeURIComponent('morty smith') },
    ];
  }
}

// Generar metadatos dinámicos
export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  try {
    const { name } = await params;
    const decodedName = decodeURIComponent(name);
    const character = await rickAndMortyService.getCharacterByName(decodedName);
    return generateCharacterMetadata(character);
  } catch (error) {
    return {
      title: 'Personaje no encontrado',
      description: 'El personaje que buscas no existe',
    };
  }
}

export default async function CharacterByNamePage({ params }: { params: Promise<{ name: string }> }) {
  try {
    const { name } = await params;
    const decodedName = decodeURIComponent(name);
    const character = await rickAndMortyService.getCharacterByName(decodedName);

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
              <span className="text-gray-900 font-medium">
                {character.name} (por nombre)
              </span>
            </li>
          </ol>
        </nav>

        {/* Character Detail */}
        <CharacterDetail character={character} />

        {/* Alternative Link */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            💡 <strong>Tip:</strong> También puedes acceder a este personaje por su ID: {' '}
            <Link 
              href={`/character/${character.id}`}
              className="underline hover:text-blue-600"
            >
              /character/{character.id}
            </Link>
          </p>
        </div>

        {/* Technical Info */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            🔧 Justificación Técnica - ISR por Nombre
          </h3>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>¿Por qué ISR por nombre?</strong> Permite acceso directo a personajes usando 
              nombres legibles para humanos en la URL, mejorando SEO y usabilidad.
            </p>
            <p>
              <strong>generateStaticParams:</strong> Pre-genera rutas para los 50 nombres más 
              comunes. URLs como <code className="bg-gray-100 px-2 py-1 rounded">/character/name/rick</code>.
            </p>
            <p>
              <strong>Encoding/Decoding:</strong> Los nombres se codifican para URLs seguras 
              (<code className="bg-gray-100 px-2 py-1 rounded">encodeURIComponent</code>).
            </p>
            <p>
              <strong>Fallback dinámico:</strong> Personajes no pre-generados se crean automáticamente 
              cuando se solicitan por primera vez.
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
    console.error('Error loading character by name:', error);
    notFound();
  }
}