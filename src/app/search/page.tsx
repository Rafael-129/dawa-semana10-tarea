'use client';

import { useState, useCallback } from 'react';
import { Metadata } from 'next';
import { Character, SearchFilters, CharacterResponse } from '@/types';
import { rickAndMortyService } from '@/services';
import { SearchForm } from '@/components/search';
import { CharacterGrid } from '@/components/character';
import { LoadingGrid, ErrorMessage, Pagination } from '@/components/ui';

export default function SearchPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
  });
  const [lastSearchFilters, setLastSearchFilters] = useState<SearchFilters>({});

  const handleSearch = useCallback(async (filters: SearchFilters, page: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      const searchFilters = { ...filters, page };
      const response: CharacterResponse = await rickAndMortyService.searchCharacters(searchFilters);
      
      setCharacters(response.results);
      setPagination({
        currentPage: page,
        totalPages: response.info.pages,
        totalResults: response.info.count,
      });
      setLastSearchFilters(filters);
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'Error en la búsqueda');
      setCharacters([]);
      setPagination({ currentPage: 1, totalPages: 1, totalResults: 0 });
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePageChange = useCallback((page: number) => {
    handleSearch(lastSearchFilters, page);
  }, [lastSearchFilters, handleSearch]);

  const hasSearched = Object.values(lastSearchFilters).some(value => 
    value !== undefined && value !== ''
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🔍 Buscar Personajes
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
          Encuentra personajes específicos usando filtros avanzados. 
          Esta página utiliza <strong>Client-Side Rendering (CSR)</strong> para 
          búsquedas en tiempo real.
        </p>
        <div className="flex justify-center space-x-4 text-sm text-gray-500">
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
            🔄 CSR - Tiempo Real
          </span>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
            🎯 Filtros Avanzados
          </span>
        </div>
      </div>

      {/* Search Form */}
      <SearchForm onSearch={(filters) => handleSearch(filters, 1)} loading={loading} />

      {/* Results Section */}
      <div className="mt-8">
        {loading && <LoadingGrid />}
        
        {error && !loading && (
          <ErrorMessage
            title="Error en la búsqueda"
            message={error}
            onRetry={() => handleSearch(lastSearchFilters, pagination.currentPage)}
          />
        )}

        {!loading && !error && hasSearched && (
          <>
            {/* Results Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Resultados de búsqueda
              </h2>
              <p className="text-gray-600">
                Se encontraron {pagination.totalResults} personajes
                {pagination.totalPages > 1 && (
                  <span> (página {pagination.currentPage} de {pagination.totalPages})</span>
                )}
              </p>
            </div>

            {/* Characters Grid */}
            <CharacterGrid characters={characters} />

            {/* Pagination */}
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              loading={loading}
            />
          </>
        )}

        {!loading && !error && !hasSearched && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎭</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              ¡Comienza tu búsqueda!
            </h3>
            <p className="text-gray-600">
              Usa los filtros de arriba para encontrar personajes específicos
            </p>
          </div>
        )}
      </div>

      {/* Technical Details */}
      <div className="mt-16 bg-white rounded-xl shadow-md p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          🔧 Justificación Técnica - CSR
        </h3>
        <div className="space-y-3 text-gray-700">
          <p>
            <strong>¿Por qué CSR aquí?</strong> La búsqueda requiere interactividad en tiempo real 
            y los resultados cambian constantemente según los filtros del usuario.
          </p>
          <p>
            <strong>Sin cache:</strong> Se usa <code className="bg-gray-100 px-2 py-1 rounded">cache: 'no-store'</code> 
            para asegurar que las búsquedas siempre devuelvan resultados actualizados.
          </p>
          <p>
            <strong>Hooks utilizados:</strong> <code className="bg-gray-100 px-2 py-1 rounded">useState</code> para 
            el estado de la búsqueda y <code className="bg-gray-100 px-2 py-1 rounded">useCallback</code> para 
            optimizar el rendimiento de las funciones.
          </p>
          <p>
            <strong>Debounce:</strong> Las búsquedas por texto tienen un retraso de 300ms para evitar 
            llamadas excesivas a la API.
          </p>
        </div>
      </div>
    </div>
  );
}