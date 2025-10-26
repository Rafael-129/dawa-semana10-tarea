import Image from 'next/image';
import { Character } from '@/types';
import { 
  formatCharacterStatus, 
  formatCharacterGender, 
  formatEpisodeCount, 
  extractEpisodeId 
} from '@/utils';

interface CharacterDetailProps {
  character: Character;
}

export function CharacterDetail({ character }: CharacterDetailProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="md:flex">
        {/* Imagen del personaje */}
        <div className="md:w-1/2">
          <div className="relative aspect-square">
            <Image
              src={character.image}
              alt={character.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Información del personaje */}
        <div className="md:w-1/2 p-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {character.name}
            </h1>
            <p className="text-lg text-gray-600">
              ID: #{character.id}
            </p>
          </div>

          <div className="grid gap-4">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700 w-20">Estado:</span>
              <span className="text-lg">{formatCharacterStatus(character.status)}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700 w-20">Especie:</span>
              <span className="text-lg">{character.species}</span>
            </div>

            {character.type && (
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-700 w-20">Tipo:</span>
                <span className="text-lg">{character.type}</span>
              </div>
            )}

            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700 w-20">Género:</span>
              <span className="text-lg">{formatCharacterGender(character.gender)}</span>
            </div>

            <div className="flex items-start gap-3">
              <span className="font-semibold text-gray-700 w-20">Origen:</span>
              <span className="text-lg">{character.origin.name}</span>
            </div>

            <div className="flex items-start gap-3">
              <span className="font-semibold text-gray-700 w-20">Ubicación:</span>
              <span className="text-lg">{character.location.name}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700 w-20">Episodios:</span>
              <span className="text-lg">{formatEpisodeCount(character.episode)}</span>
            </div>
          </div>

          {/* Lista de episodios */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Apariciones:</h3>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {character.episode.slice(0, 20).map((episodeUrl) => {
                const episodeId = extractEpisodeId(episodeUrl);
                return (
                  <span
                    key={episodeUrl}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    EP {episodeId}
                  </span>
                );
              })}
              {character.episode.length > 20 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  +{character.episode.length - 20} más
                </span>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Creado: {new Date(character.created).toLocaleDateString('es-ES')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}