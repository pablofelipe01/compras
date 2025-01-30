// src/app/cuentas-cobro/[id]/page.tsx
'use client'
import Link from 'next/link';

export default function CuentaCobroDetailPage() {
  return (
    <main className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header con botón de regreso */}
        <div className="flex items-center mb-8">
          <Link
            href="/dashboard"
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Volver al Dashboard
          </Link>
        </div>

        {/* Contenido */}
        <div className="bg-gray-800 rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-xl font-semibold text-white mb-4">
              Detalles de Cuenta de Cobro
            </h1>
            <p className="text-gray-400">
              Esta sección está en desarrollo...
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}