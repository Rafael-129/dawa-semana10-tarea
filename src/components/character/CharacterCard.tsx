'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Character } from '@/types';
import { formatCharacterStatus, formatCharacterGender, getStatusColor } from '@/utils';
import { generateImagePlaceholder } from '@/utils/imageUtils';

interface CharacterCardProps {
  character: Character;
  lazy?: boolean;
  priority?: boolean;
}

export function CharacterCard({ character, lazy = true, priority = false }: CharacterCardProps) {
  return (
    <Link 
      href={`/character/${character.id}`}
      className="group block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-purple-200"
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-100 to-gray-200">
        <Image
          src={character.image}
          alt={character.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          placeholder="blur"
          blurDataURL={generateImagePlaceholder()}
          priority={priority}
          loading={lazy && !priority ? 'lazy' : 'eager'}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Status indicator */}
        <div className="absolute top-3 right-3">
          <div className={`w-4 h-4 rounded-full ${getStatusColor(character.status)} ring-3 ring-white shadow-lg`} />
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6 space-y-3">
        <h3 className="font-bold text-xl text-slate-800 group-hover:text-purple-600 transition-colors line-clamp-1 mb-3">
          {character.name}
        </h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg group-hover:bg-purple-50 transition-colors">
            <span className="font-semibold text-slate-600 min-w-[60px]">Estado:</span>
            <span className="text-slate-800">{formatCharacterStatus(character.status)}</span>
          </div>
          
          <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
            <span className="font-semibold text-slate-600 min-w-[60px]">Especie:</span>
            <span className="text-slate-800">{character.species}</span>
          </div>
          
          <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg group-hover:bg-emerald-50 transition-colors">
            <span className="font-semibold text-slate-600 min-w-[60px]">Género:</span>
            <span className="text-slate-800">{formatCharacterGender(character.gender)}</span>
          </div>
          
          <div className="flex items-start gap-3 p-2 bg-slate-50 rounded-lg group-hover:bg-cyan-50 transition-colors">
            <span className="font-semibold text-slate-600 min-w-[60px]">Origen:</span>
            <span className="line-clamp-1 text-slate-800">{character.origin.name}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}