'use client';

import { useState, useEffect } from 'react';
import { SearchFilters, CharacterStatus, CharacterGender } from '@/types';
import { CHARACTER_STATUS, CHARACTER_GENDER } from '@/constants';
import { debounce } from '@/utils';

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
  loading?: boolean;
}

export function SearchForm({ onSearch, loading = false }: SearchFormProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    name: '',
    status: undefined,
    species: '',
    type: '',
    gender: undefined,
  });

  // Debounce para búsqueda en tiempo real
  const debouncedSearch = debounce((newFilters: SearchFilters) => {
    onSearch(newFilters);
  }, 300);

  useEffect(() => {
    // Solo buscar si hay algún filtro activo
    const hasActiveFilters = Object.values(filters).some(value => 
      value !== undefined && value !== ''
    );
    
    if (hasActiveFilters) {
      debouncedSearch(filters);
    }
  }, [filters, debouncedSearch]);

  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value === '' ? undefined : value,
    }));
  };

  const clearFilters = () => {
    const emptyFilters: SearchFilters = {
      name: '',
      status: undefined,
      species: '',
      type: '',
      gender: undefined,
    };
    setFilters(emptyFilters);
    onSearch(emptyFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== ''
  );

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent flex items-center">
          🔍 Buscar Personajes
        </h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-slate-500 hover:text-purple-600 underline transition-colors px-3 py-1 rounded-full hover:bg-purple-50"
            disabled={loading}
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Búsqueda por nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            value={filters.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Ej: Rick, Morty..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm"
            disabled={loading}
          />
        </div>

        {/* Filtro por estado */}
        <div>
          <label htmlFor="status" className="block text-sm font-semibold text-slate-700 mb-2">
            Estado
          </label>
          <select
            id="status"
            value={filters.status || ''}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm"
            disabled={loading}
          >
            <option value="">Todos los estados</option>
            {CHARACTER_STATUS.map((status) => (
              <option key={status} value={status}>
                {status === 'Alive' ? 'Vivo' : status === 'Dead' ? 'Muerto' : 'Desconocido'}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por género */}
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
            Género
          </label>
          <select
            id="gender"
            value={filters.gender || ''}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            disabled={loading}
          >
            <option value="">Todos los géneros</option>
            {CHARACTER_GENDER.map((gender) => (
              <option key={gender} value={gender}>
                {gender === 'Male' ? 'Masculino' : 
                 gender === 'Female' ? 'Femenino' : 
                 gender === 'Genderless' ? 'Sin género' : 'Desconocido'}
              </option>
            ))}
          </select>
        </div>

        {/* Búsqueda por especie */}
        <div>
          <label htmlFor="species" className="block text-sm font-medium text-gray-700 mb-1">
            Especie
          </label>
          <input
            id="species"
            type="text"
            value={filters.species}
            onChange={(e) => handleInputChange('species', e.target.value)}
            placeholder="Ej: Human, Alien..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            disabled={loading}
          />
        </div>

        {/* Búsqueda por tipo */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo
          </label>
          <input
            id="type"
            type="text"
            value={filters.type}
            onChange={(e) => handleInputChange('type', e.target.value)}
            placeholder="Ej: Genetic experiment..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            disabled={loading}
          />
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Buscando...</span>
        </div>
      )}
    </div>
  );
}