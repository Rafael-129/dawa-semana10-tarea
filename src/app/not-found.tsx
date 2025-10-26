import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <div className="text-9xl mb-8">🛸</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ¡Portal no encontrado!
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Parece que este personaje se perdió en el multiverso. 
          Rick debe haber roto algo otra vez... 
        </p>
        
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            🏠 Volver al inicio
          </Link>
          <Link
            href="/search"
            className="inline-block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            🔍 Buscar personajes
          </Link>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            💡 ¿Qué puedes hacer?
          </h2>
          <ul className="text-left space-y-2 text-gray-700">
            <li>• Verificar que la URL esté escrita correctamente</li>
            <li>• Ir al <Link href="/" className="text-blue-600 hover:underline">inicio</Link> y explorar desde ahí</li>
            <li>• Usar la <Link href="/search" className="text-blue-600 hover:underline">búsqueda</Link> para encontrar personajes específicos</li>
            <li>• Reportar el problema si crees que es un error</li>
          </ul>
        </div>
      </div>
    </div>
  );
}