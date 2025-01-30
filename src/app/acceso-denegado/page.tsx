// src/app/acceso-denegado/page.tsx
import Link from 'next/link';

export default function AccesoDenegadoPage() {
  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Acceso Denegado
        </h1>
        <p className="text-gray-400 mb-8">
          Su cuenta no está activa o no tiene los permisos necesarios.
        </p>
        <Link
          href="/login"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
        >
          Volver al Login
        </Link>
      </div>
    </main>
  );
}