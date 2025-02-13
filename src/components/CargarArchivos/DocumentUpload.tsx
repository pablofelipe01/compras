'use client';

import { useState } from 'react';

interface DocumentUploadProps {
  onUploadSuccess: (url: string) => void;
}

export function DocumentUpload({ onUploadSuccess }: DocumentUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false); // Nuevo estado para manejar la vista

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setError(null);
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      setError('Por favor, selecciona un archivo.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('folder', 'proveedores');

    setIsUploading(true);
    setError(null);

    try {
      const response = await fetch('/api/actualizar-perfil/uploapDoc/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error en la subida del archivo.');
      }

      const data = await response.json();

      if (data.secure_url) {
        onUploadSuccess(data.secure_url);
        setSelectedFile(null);
        setUploadSuccess(true); // Oculta la vista de carga
      } else {
        throw new Error('No se pudo obtener la URL del archivo.');
      }
    } catch (err) {
      setError('Error al subir el archivo. Inténtalo de nuevo.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {uploadSuccess ? ( // Si la subida fue exitosa, mostrar mensaje y ocultar carga
        <p className="text-green-500 font-semibold">El archivo se cargó correctamente, por favor no cargar otro archivo y esperar a que el area encargada actualice su estado.</p>
      ) : (
        <>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6">
            <label className="block">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-600 file:text-white hover:file:bg-green-700"
              />
            </label>
            {selectedFile && <p className="mt-2 text-sm text-green-400">Archivo: {selectedFile.name}</p>}
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>

          <button
            onClick={uploadFile}
            disabled={isUploading}
            className={`w-fit px-6 flex justify-center py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${
              isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isUploading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="10" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              'Subir Archivo'
            )}
          </button>
        </>
      )}
    </div>
  );
}
