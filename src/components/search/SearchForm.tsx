'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { SearchFilters, CharacterStatus, CharacterGender } from '@/types';
import { CHARACTER_STATUS, CHARACTER_GENDER } from '@/constants';

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

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Limpiar timeout anterior
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Solo buscar si hay algún filtro activo
    const hasActiveFilters = Object.values(filters).some(value => 
      value !== undefined && value !== ''
    );
    
    if (hasActiveFilters) {
      debounceTimeout.current = setTimeout(() => {
        onSearch(filters);
      }, 300);
    }

    // Cleanup
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [filters, onSearch]); // ✅ onSearch ahora está memoizado

  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value === '' ? undefined : value,
    }));
  };

  const clearFilters = useCallback(() => {
    // Limpiar timeout si existe
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    
    const emptyFilters: SearchFilters = {
      name: '',
      status: undefined,
      species: '',
      type: '',
      gender: undefined,
    };
    setFilters(emptyFilters);
    // Llamar directamente onSearch con filtros vacíos para limpiar resultados
    onSearch(emptyFilters);
  }, [onSearch]);

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
            className="text-sm bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold px-4 py-2 rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            disabled={loading}
          >
            ✨ Limpiar filtros
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
            placeholder="🔍 Ej: Rick, Morty, Summer..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 shadow-sm"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white text-gray-900 shadow-sm"
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
          <label htmlFor="gender" className="block text-sm font-semibold text-slate-700 mb-2">
            Género
          </label>
          <select
            id="gender"
            value={filters.gender || ''}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-white text-gray-900 shadow-sm"
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
          <label htmlFor="species" className="block text-sm font-semibold text-slate-700 mb-2">
            Especie
          </label>
          <input
            id="species"
            type="text"
            value={filters.species}
            onChange={(e) => handleInputChange('species', e.target.value)}
            placeholder="🧬 Ej: Human, Alien, Robot..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 shadow-sm"
            disabled={loading}
          />
        </div>

        {/* Búsqueda por tipo */}
        <div>
          <label htmlFor="type" className="block text-sm font-semibold text-slate-700 mb-2">
            Tipo
          </label>
          <input
            id="type"
            type="text"
            value={filters.type}
            onChange={(e) => handleInputChange('type', e.target.value)}
            placeholder="🧪 Ej: Genetic experiment..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 shadow-sm"
            disabled={loading}
          />
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-200 border-t-blue-600"></div>
            <div className="flex flex-col">
              <span className="text-blue-700 font-semibold text-lg">Buscando personajes...</span>
              <span className="text-blue-500 text-sm">Explorando el multiverso 🌌</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}