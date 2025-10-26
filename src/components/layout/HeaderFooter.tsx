import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className="flex items-center space-x-3 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            <span className="text-2xl">🛸</span>
            <span>Rick & Morty Explorer</span>
          </Link>
          
          <nav className="flex space-x-6">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Inicio
            </Link>
            <Link 
              href="/search" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Buscar
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Desarrollado con ❤️ usando Next.js y la{' '}
            <a 
              href="https://rickandmortyapi.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Rick and Morty API
            </a>
          </p>
          <div className="flex justify-center space-x-4 text-sm text-gray-500">
            <span>🚀 SSG</span>
            <span>⚡ ISR</span>
            <span>🔍 CSR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}