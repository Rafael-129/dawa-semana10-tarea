// Tipos de utilidad para la aplicación

export interface ApiError {
  error: string;
  message?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Props comunes para componentes
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Tipos para SSG/ISR
export interface StaticParams {
  id: string;
}

export interface StaticNameParams {
  name: string;
}

// Configuración de cache y revalidación
export interface CacheConfig {
  revalidate?: number;
  tags?: string[];
}

// Metadatos para SEO
export interface PageMetadata {
  title: string;
  description: string;
  image?: string;
  url?: string;
}