// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-between p-8">
      <main className="flex flex-col items-center justify-center flex-grow text-center">
        <div className="mb-8">
          {/* Logo con efecto glow */}
          <div className="relative w-[200px] h-[200px] mx-auto filter drop-shadow-glow">
            <Image
              src="/logo.png"
              alt="Sirius Regenerative"
              width={200}
              height={200}
              className="mb-4"
              priority
            />
          </div>
          <h2 className="text-2xl font-bold text-indigo-400">
            SIRIUS REGENERATIVE
          </h2>
        </div>

        <p className="text-xl text-gray-400 mb-12 max-w-2xl">
          Si eres proveedor o prestador de servicios, accede a tu portal. 
          Si aún no lo eres, únete a nuestra red.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/login"
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
              transition-colors duration-200 text-lg font-medium"
          >
            Acceder como Cliente
          </Link>

          <Link
            href="/registro"
            className="px-8 py-3 bg-transparent border-2 border-indigo-500 text-indigo-400 
              rounded-lg hover:bg-indigo-500 hover:text-white transition-colors duration-200 
              text-lg font-medium"
          >
            Crear Perfil de Cliente
          </Link>
        </div>
      </main>

      <footer className="text-center text-gray-500 py-8">
        <p>&copy; {new Date().getFullYear()} SIRIUS REGENERATIVE. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}