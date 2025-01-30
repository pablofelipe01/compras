// src/app/registro/page.tsx
'use client'
import Link from 'next/link'
import RegistroForm from '@/components/RegistroForm'

export default function RegistroPage() {
 return (
   <main className="min-h-screen bg-gray-900 py-6 sm:py-12">
     <div className="container mx-auto px-4 sm:px-6 lg:px-8">
       {/* Botón de regreso */}
       <Link
         href="/"
         className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8"
       >
         <svg 
           xmlns="http://www.w3.org/2000/svg" 
           className="h-5 w-5 mr-2" 
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
         Volver al Inicio
       </Link>

       <div className="mb-8 text-center">
         <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
           Registro de Proveedor
         </h1>
         <p className="text-gray-400">
           Complete el formulario con sus datos y documentos requeridos
         </p>
       </div>

       <div className="max-w-4xl mx-auto bg-gray-800 shadow-xl rounded-lg border border-gray-700">
         <RegistroForm />
       </div>

       <div className="mt-8 text-center text-sm text-gray-400">
         <p>Si tiene problemas con el registro, por favor contacte al soporte técnico</p>
       </div>
     </div>
   </main>
 )
}