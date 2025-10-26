// Constantes para la API de Rick and Morty
export const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const API_ENDPOINTS = {
  CHARACTERS: `${API_BASE_URL}/character`,
  CHARACTER_BY_ID: (id: number | string) => `${API_BASE_URL}/character/${id}`,
  CHARACTERS_SEARCH: `${API_BASE_URL}/character/`,
} as const;

// Configuración de cache para diferentes estrategias
export const CACHE_CONFIG = {
  // SSG - Cache indefinido hasta rebuild
  STATIC_GENERATION: {
    revalidate: false,
  },
  // ISR - Revalidación cada 10 días (864000 segundos)
  INCREMENTAL_STATIC: {
    revalidate: 60 * 60 * 24 * 10, // 10 días
  },
  // Para búsquedas en tiempo real
  NO_CACHE: {
    cache: 'no-store' as const,
  },
} as const;

// Estados y géneros disponibles
export const CHARACTER_STATUS = ['Alive', 'Dead', 'unknown'] as const;
export const CHARACTER_GENDER = ['Female', 'Male', 'Genderless', 'unknown'] as const;

// Configuración de paginación
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  ITEMS_PER_PAGE: 20, // API devuelve 20 por defecto
} as const;

// Metadatos de la aplicación
export const APP_METADATA = {
  title: 'Rick and Morty Character Explorer',
  description: 'Explora todos los personajes del universo de Rick and Morty',
  keywords: 'Rick and Morty, characters, API, Next.js, SSG, ISR, SSR',
} as const;