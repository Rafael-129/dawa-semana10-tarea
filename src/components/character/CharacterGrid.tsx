import { Character } from '@/types';
import { CharacterCard } from './CharacterCard';

interface CharacterGridProps {
  characters: Character[];
  priority?: boolean;
}

export function CharacterGrid({ characters, priority = false }: CharacterGridProps) {
  if (characters.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold mb-2">No se encontraron personajes</h3>
        <p className="text-center">Intenta con otros filtros de búsqueda</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {characters.map((character, index) => (
        <CharacterCard
          key={character.id}
          character={character}
          lazy={!priority || index > 3} // Los primeros 4 no son lazy si es priority
          priority={priority && index < 4} // Solo los primeros 4 tienen priority
        />
      ))}
    </div>
  );
}