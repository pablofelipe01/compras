// src/app/actualizar/page.tsx
import ActualizarForm from '../../components/ActualizarForm';  // Ruta relativa al componente ActualizarForm

export default function ActualizarPage() {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-lg w-full">
        <ActualizarForm />  {/* Aquí estamos usando el componente que creamos */}
      </div>
    </div>
  );
}
