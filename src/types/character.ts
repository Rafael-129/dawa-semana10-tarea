// Tipos para la API de Rick and Morty

export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Location {
  name: string;
  url: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharacterResponse {
  info: Info;
  results: Character[];
}

export interface SingleCharacterResponse extends Character {}

// Tipos para filtros de búsqueda
export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';

export interface SearchFilters {
  name?: string;
  status?: CharacterStatus;
  species?: string;
  type?: string;
  gender?: CharacterGender;
  page?: number;
}

// Tipos para componentes
export interface CharacterCardProps {
  character: Character;
  lazy?: boolean;
}

export interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
  loading?: boolean;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}