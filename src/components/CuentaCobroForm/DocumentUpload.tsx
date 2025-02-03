// src/components/CuentaCobroForm/DocumentUpload.tsx
interface DocumentUploadProps {
  onFileSelected: (file: File | null) => void;
  error?: string;
  selectedFile: File | null;
}

export function DocumentUpload({ onFileSelected, error, selectedFile }: DocumentUploadProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium text-white">Documentos Requeridos</h3>
      
      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6">
        <label className="block">
          <span className="text-sm font-medium text-gray-300">
            Certificado de Parafiscales
            <p>Tener en cuenta que la base de cotización para aportes a seguridad social es el cuarenta por ciento (40%) del valor mensualizado del contrato. Ley 2277 de 2022 - Artículo 89. Ingreso base de cotización (IBC) de los independientes.</p>
          </span>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => onFileSelected(e.target.files?.[0] || null)}
            className="mt-1 block w-full text-sm text-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-medium
              file:bg-indigo-600 file:text-white
              hover:file:bg-indigo-700"
          />
        </label>
        
        {selectedFile && (
          <p className="mt-2 text-sm text-green-400">
            Archivo seleccionado: {selectedFile.name}
          </p>
        )}
        
        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
}