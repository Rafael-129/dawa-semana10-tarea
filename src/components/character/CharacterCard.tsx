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
      className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={character.image}
          alt={character.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          placeholder="blur"
          blurDataURL={generateImagePlaceholder()}
          priority={priority}
          loading={lazy && !priority ? 'lazy' : 'eager'}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Status indicator */}
        <div className="absolute top-3 right-3">
          <div className={`w-3 h-3 rounded-full ${getStatusColor(character.status)} ring-2 ring-white`} />
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
          {character.name}
        </h3>
        
        <div className="space-y-1 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <span className="font-medium">Estado:</span>
            {formatCharacterStatus(character.status)}
          </p>
          
          <p className="flex items-center gap-2">
            <span className="font-medium">Especie:</span>
            {character.species}
          </p>
          
          <p className="flex items-center gap-2">
            <span className="font-medium">Género:</span>
            {formatCharacterGender(character.gender)}
          </p>
          
          <p className="flex items-center gap-2">
            <span className="font-medium">Origen:</span>
            <span className="line-clamp-1">{character.origin.name}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}