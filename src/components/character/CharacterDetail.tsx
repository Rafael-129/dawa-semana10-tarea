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
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
      <div className="lg:flex">
        {/* Imagen del personaje */}
        <div className="lg:w-1/2">
          <div className="relative h-80 lg:h-full min-h-[400px]">
            <Image
              src={character.image}
              alt={character.name}
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Información del personaje */}
        <div className="lg:w-1/2 p-6 lg:p-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              {character.name}
            </h1>
            <p className="text-lg text-slate-600 font-medium">
              ID: #{character.id}
            </p>
          </div>

          <div className="grid gap-4">
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <span className="font-bold text-slate-700 min-w-[80px] text-sm">Estado:</span>
              <span className="text-lg font-semibold text-green-700">{formatCharacterStatus(character.status)}</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
              <span className="font-bold text-slate-700 min-w-[80px] text-sm">Especie:</span>
              <span className="text-lg font-semibold text-blue-700">{character.species}</span>
            </div>

            {character.type && (
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                <span className="font-bold text-slate-700 min-w-[80px] text-sm">Tipo:</span>
                <span className="text-lg font-semibold text-purple-700">{character.type}</span>
              </div>
            )}

            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-200">
              <span className="font-bold text-slate-700 min-w-[80px] text-sm">Género:</span>
              <span className="text-lg font-semibold text-pink-700">{formatCharacterGender(character.gender)}</span>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200">
              <span className="font-bold text-slate-700 min-w-[80px] text-sm">Origen:</span>
              <span className="text-lg font-semibold text-orange-700 break-words">{character.origin.name}</span>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-200">
              <span className="font-bold text-slate-700 min-w-[80px] text-sm">Ubicación:</span>
              <span className="text-lg font-semibold text-teal-700 break-words">{character.location.name}</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg border border-violet-200">
              <span className="font-bold text-slate-700 min-w-[80px] text-sm">Episodios:</span>
              <span className="text-lg font-semibold text-violet-700">{formatEpisodeCount(character.episode)}</span>
            </div>
          </div>

          {/* Lista de episodios */}
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg border border-slate-200 p-4">
            <h3 className="font-bold text-slate-800 mb-3 text-lg flex items-center">
              📺 Apariciones:
            </h3>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {character.episode.slice(0, 15).map((episodeUrl) => {
                const episodeId = extractEpisodeId(episodeUrl);
                return (
                  <span
                    key={episodeUrl}
                    className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-shadow"
                  >
                    EP {episodeId}
                  </span>
                );
              })}
              {character.episode.length > 15 && (
                <span className="px-3 py-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-full text-xs font-bold shadow-md">
                  +{character.episode.length - 15} más
                </span>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500 font-medium">
              📅 Creado: {new Date(character.created).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}