// src/components/CargarArchivos/DocumentUpload.tsx
interface DocumentUploadProps {
  onFileSelected: (file: File | null) => void;
  error?: string;
  selectedFile: File | null;
}

export function DocumentUpload({ onFileSelected, error, selectedFile }: DocumentUploadProps) {
  return (
    <div className="space-y-2">
      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6">
        <label className="block">
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
