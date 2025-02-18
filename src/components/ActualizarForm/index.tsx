'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { inputBaseClasses, labelBaseClasses, submitButtonClasses } from './styles';
import Link from 'next/link';
import { ciudadesColombia, bancosColombia } from '../../constants/colombiaData';

export default function ActualizarForm() {
  const [formData, setFormData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Cargar los datos del proveedor desde la API
  useEffect(() => {
    fetch('/api/actualizar-perfil/uploapPerfil')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then((data) => {
        setFormData(data.proveedorData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Enviar datos del formulario a la API de actualización
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/actualizar-perfil', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al actualizar los datos');
      }

      // Mostrar mensaje de éxito y redirigir al usuario
      if (window.confirm('✅ Perfil actualizado correctamente. ¿Deseas volver al dashboard?')) {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p className="text-white">Cargando...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
      <Link href="/dashboard" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver al Inicio
      </Link>

      <h2 className="text-2xl font-bold text-white mb-4">Actualizar Perfil</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className={labelBaseClasses}>Nombre Completo</label>
          <input type="text" name="nombres" value={formData?.nombres || ''} onChange={handleChange} className={inputBaseClasses} />
        </div>

        <div className="mb-4">
          <label className={labelBaseClasses}>Apellidos</label>
          <input type="text" name="apellidos" value={formData?.apellidos || ''} onChange={handleChange} className={inputBaseClasses} />
        </div>

        {/* Tipo de Documento */}
        <div className="mb-4">
          <label className={labelBaseClasses}>Tipo Documento</label>
          <select name="tipoDocumento" value={formData?.tipoDocumento || ''} onChange={handleChange} className={inputBaseClasses}>
            <option value="CC">CC</option>
            <option value="CE">CE</option>
            <option value="NIT">NIT</option>
          </select>
        </div>

        <div className="mb-4">
          <label className={labelBaseClasses}>Número Documento</label>
          <input type="text" name="numeroDocumento" value={formData?.numeroDocumento || ''} onChange={handleChange} className={inputBaseClasses} />
        </div>

        <div className="mb-4">
          <label className={labelBaseClasses}>Teléfono</label>
          <input type="text" name="telefono" value={formData?.telefono || ''} onChange={handleChange} className={inputBaseClasses} />
        </div>

        <div className="mb-4">
          <label className={labelBaseClasses}>Correo Electrónico</label>
          <input type="email" name="correoElectronico" value={formData?.correoElectronico || ''} onChange={handleChange} className={inputBaseClasses} />
        </div>

        {/* Ciudad */}
        <div className="mb-4">
          <label className={labelBaseClasses}>Ciudad</label>
          <select name="ciudad" value={formData?.ciudad || ''} onChange={handleChange} className={inputBaseClasses}>
            {ciudadesColombia.map((ciudad, index) => (
              <option key={index} value={ciudad}>
                {ciudad}
              </option>
            ))}
          </select>
        </div>

        {/* Banco */}
        <div className="mb-4">
          <label className={labelBaseClasses}>Banco</label>
          <select name="banco" value={formData?.banco || ''} onChange={handleChange} className={inputBaseClasses}>
            {bancosColombia.map((banco, index) => (
              <option key={index} value={banco}>
                {banco}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className={labelBaseClasses}>Número Cuenta</label>
          <input type="text" name="numeroCuenta" value={formData?.numeroCuenta || ''} onChange={handleChange} className={inputBaseClasses} />
        </div>

        <div className="mb-4">
          <label className={labelBaseClasses}>Tipo Cuenta</label>
          <select name="tipoCuenta" value={formData?.tipoCuenta || ''} onChange={handleChange} className={inputBaseClasses}>
            <option value="Ahorro">Ahorro</option>
            <option value="Corriente">Corriente</option>
          </select>
        </div>

        {/* Campo oculto para identificación */}
        <input type="hidden" name="identificacion" value={formData?.identificacion || ''} />

        <button type="submit" className={`${submitButtonClasses.base} ${submitButtonClasses.enabled}`}>
          Actualizar Perfil
        </button>
      </form>
    </div>
  );
}
