import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className="flex items-center space-x-3 text-xl font-bold bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            <span className="text-2xl">🛸</span>
            <span>Rick & Morty Explorer</span>
          </Link>
          
          <nav className="flex space-x-1">
            <Link 
              href="/" 
              className="text-slate-600 hover:text-cyan-600 font-medium px-4 py-2 rounded-full hover:bg-cyan-50 transition-all duration-300"
            >
              Inicio
            </Link>
            <Link 
              href="/search" 
              className="text-slate-600 hover:text-purple-600 font-medium px-4 py-2 rounded-full hover:bg-purple-50 transition-all duration-300"
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
    <footer className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-6">
          <div className="text-2xl">🛸</div>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Desarrollado con ❤️ usando Next.js y la{' '}
            <a 
              href="https://rickandmortyapi.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/50 hover:decoration-cyan-300 transition-colors"
            >
              Rick and Morty API
            </a>
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full font-medium shadow-lg">
              🚀 SSG
            </span>
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full font-medium shadow-lg">
              ⚡ ISR
            </span>
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-medium shadow-lg">
              🔍 CSR
            </span>
          </div>
          <div className="border-t border-slate-700 pt-6">
            <p className="text-slate-400 text-sm">
              © 2024 Rick & Morty Explorer | TECSUP - DAWA
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}