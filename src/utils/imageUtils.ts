/**
 * Utilidades para manejo de imágenes con lazy loading
 */

/**
 * Genera un placeholder base64 para lazy loading
 */
export function generateImagePlaceholder(width: number = 300, height: number = 300): string {
  // SVG placeholder simple
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" text-anchor="middle" dy="0.3em" fill="#9ca3af" font-family="Arial, sans-serif" font-size="16">
        Cargando...
      </text>
    </svg>
  `;
  
  const base64 = btoa(svg);
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Opcimiza URL de imagen de la API
 */
export function optimizeImageUrl(url: string, size?: 'small' | 'medium' | 'large'): string {
  // La API de Rick and Morty ya proporciona imágenes optimizadas
  // Aquí podríamos agregar lógica para diferentes tamaños si fuera necesario
  return url;
}

/**
 * Crea un observer para lazy loading
 */
export function createImageObserver(callback: (entry: IntersectionObserverEntry) => void) {
  if (typeof window === 'undefined') return null;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(callback);
    },
    {
      rootMargin: '50px', // Cargar imagen 50px antes de que sea visible
      threshold: 0.1,
    }
  );

  return observer;
}