import { 
  CharacterResponse, 
  Character, 
  SearchFilters,
  ApiError 
} from '@/types';
import { API_ENDPOINTS } from '@/constants';

/**
 * Servicio para interactuar con la API de Rick and Morty
 */
class RickAndMortyService {
  private async fetchWithErrorHandling<T>(url: string, options?: RequestInit): Promise<T> {
    try {
      console.log('Fetching URL:', url); // Debug log
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        ...options,
      });

      console.log('Response status:', response.status); // Debug log

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Character not found`);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data); // Debug log
      return data;
    } catch (error) {
      console.error('API Error:', error);
      
      // Si es un error de red o parsing
      if (error instanceof TypeError) {
        throw new Error('Network error - please check your internet connection');
      }
      
      // Re-throw otros errores con el mensaje original
      throw error;
    }
  }

  /**
   * Obtiene todos los personajes (para SSG)
   * Usa cache forzado para optimización
   */
  async getAllCharacters(page: number = 1): Promise<CharacterResponse> {
    const url = `${API_ENDPOINTS.CHARACTERS}?page=${page}`;
    return this.fetchWithErrorHandling<CharacterResponse>(url, {
      // Cache forzado para SSG
      cache: 'force-cache',
    });
  }

  /**
   * Obtiene un personaje por ID (para ISR)
   */
  async getCharacterById(id: number | string): Promise<Character> {
    const url = API_ENDPOINTS.CHARACTER_BY_ID(id);
    console.log('Fetching character by ID:', id, 'URL:', url);
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        // Configuración ISR simplificada
        next: { 
          revalidate: 60 * 60 * 24 * 10, // 10 días
          tags: [`character-${id}`] 
        },
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Character with ID ${id} not found`);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Character data received:', data.name);
      return data;
    } catch (error) {
      console.error('Error in getCharacterById:', error);
      throw error;
    }
  }

  /**
   * Obtiene un personaje por nombre (para ISR)
   */
  async getCharacterByName(name: string): Promise<Character> {
    const url = `${API_ENDPOINTS.CHARACTERS_SEARCH}?name=${encodeURIComponent(name)}`;
    const response = await fetch(url, {
      next: { 
        revalidate: 60 * 60 * 24 * 10, // 10 días
        tags: [`character-name-${name.toLowerCase()}`] 
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json() as CharacterResponse;
    
    if (data.results.length === 0) {
      throw new Error(`Character with name "${name}" not found`);
    }
    
    return data.results[0];
  }

  /**
   * Busca personajes con filtros (para CSR)
   * Sin cache para búsquedas en tiempo real
   */
  async searchCharacters(filters: SearchFilters): Promise<CharacterResponse> {
    console.log('🔍 Iniciando búsqueda con filtros:', filters);
    
    const searchParams = new URLSearchParams();
    
    if (filters.name) searchParams.append('name', filters.name);
    if (filters.status) searchParams.append('status', filters.status);
    if (filters.species) searchParams.append('species', filters.species);
    if (filters.type) searchParams.append('type', filters.type);
    if (filters.gender) searchParams.append('gender', filters.gender);
    if (filters.page) searchParams.append('page', filters.page.toString());

    const url = `${API_ENDPOINTS.CHARACTERS_SEARCH}?${searchParams.toString()}`;
    console.log('🌐 URL de búsqueda:', url);
    
    try {
      const result = await this.fetchWithErrorHandling<CharacterResponse>(url, {
        // Sin cache para búsquedas en tiempo real
        cache: 'no-store',
      });
      console.log('✅ Búsqueda exitosa:', result.results.length, 'personajes encontrados');
      return result;
    } catch (error) {
      console.error('❌ Error en búsqueda:', error);
      throw error;
    }
  }

  /**
   * Obtiene todos los IDs de personajes para generateStaticParams
   */
  async getAllCharacterIds(): Promise<number[]> {
    const ids: number[] = [];
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      try {
        const response = await this.getAllCharacters(page);
        ids.push(...response.results.map(char => char.id));
        hasNextPage = !!response.info.next;
        page++;
      } catch (error) {
        console.error(`Error fetching page ${page}:`, error);
        hasNextPage = false;
      }
    }

    return ids;
  }

  /**
   * Obtiene todos los nombres de personajes para generateStaticParams
   */
  async getAllCharacterNames(): Promise<string[]> {
    const names: string[] = [];
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      try {
        const response = await this.getAllCharacters(page);
        names.push(...response.results.map(char => char.name));
        hasNextPage = !!response.info.next;
        page++;
      } catch (error) {
        console.error(`Error fetching page ${page}:`, error);
        hasNextPage = false;
      }
    }

    return names;
  }
}

// Exportar instancia singleton
export const rickAndMortyService = new RickAndMortyService();

// Exportar la clase para testing
export { RickAndMortyService };