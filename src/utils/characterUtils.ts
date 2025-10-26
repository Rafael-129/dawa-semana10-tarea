import { Character } from '@/types';

/**
 * Genera un slug URL-friendly a partir del nombre del personaje
 */
export function generateCharacterSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remover caracteres especiales
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .trim();
}

/**
 * Formatea el estado del personaje para mostrar
 */
export function formatCharacterStatus(status: string): string {
  switch (status.toLowerCase()) {
    case 'alive':
      return '🟢 Vivo';
    case 'dead':
      return '🔴 Muerto';
    case 'unknown':
      return '⚪ Desconocido';
    default:
      return status;
  }
}

/**
 * Formatea el género del personaje
 */
export function formatCharacterGender(gender: string): string {
  switch (gender.toLowerCase()) {
    case 'male':
      return '♂️ Masculino';
    case 'female':
      return '♀️ Femenino';
    case 'genderless':
      return '⚫ Sin género';
    case 'unknown':
      return '❓ Desconocido';
    default:
      return gender;
  }
}

/**
 * Extrae el ID del episodio de la URL
 */
export function extractEpisodeId(episodeUrl: string): string {
  const match = episodeUrl.match(/\/(\d+)$/);
  return match ? match[1] : '';
}

/**
 * Obtiene el color del estado para usar en la UI
 */
export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'alive':
      return 'bg-green-500';
    case 'dead':
      return 'bg-red-500';
    case 'unknown':
      return 'bg-gray-500';
    default:
      return 'bg-gray-500';
  }
}

/**
 * Debounce para búsquedas en tiempo real
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Formatea el número de episodios
 */
export function formatEpisodeCount(episodes: string[]): string {
  const count = episodes.length;
  return `${count} episodio${count !== 1 ? 's' : ''}`;
}

/**
 * Genera metadatos para SEO basados en el personaje
 */
export function generateCharacterMetadata(character: Character) {
  return {
    title: `${character.name} | Rick and Morty Explorer`,
    description: `Conoce a ${character.name}, ${character.species} de ${character.origin.name}. Estado: ${character.status}, Género: ${character.gender}`,
    openGraph: {
      title: `${character.name} | Rick and Morty`,
      description: `${character.species} - ${character.status}`,
      images: [character.image],
    },
  };
}