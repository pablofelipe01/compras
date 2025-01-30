// src/components/RegistroForm/DocumentUpload.tsx
import { DocumentosState } from '../types';
import { fileInputClasses, labelBaseClasses, errorClasses, successMessageClasses } from '../styles';

interface DocumentUploadProps {
  documentos: DocumentosState;
  handleFileChange: (tipo: keyof DocumentosState, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DocumentUpload = ({ documentos, handleFileChange }: DocumentUploadProps) => (
  <div className="space-y-6 mt-8">
    <h3 className="text-lg font-medium text-gray-200">Documentos Requeridos</h3>
    
    {/* RUT */}
    <div>
      <label className={labelBaseClasses}>RUT (PDF, PNG o JPG)</label>
      <input
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        onChange={(e) => handleFileChange('rut', e)}
        className={fileInputClasses}
      />
      {documentos.rut.error && (
        <p className={errorClasses}>{documentos.rut.error}</p>
      )}
      {documentos.rut.file && (
        <p className={successMessageClasses}>
          Archivo seleccionado: {documentos.rut.file.name}
        </p>
      )}
    </div>

    {/* Documento de Identidad */}
    <div>
      <label className={labelBaseClasses}>Documento de Identidad (PDF, PNG o JPG)</label>
      <input
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        onChange={(e) => handleFileChange('documento', e)}
        className={fileInputClasses}
      />
      {documentos.documento.error && (
        <p className={errorClasses}>{documentos.documento.error}</p>
      )}
      {documentos.documento.file && (
        <p className={successMessageClasses}>
          Archivo seleccionado: {documentos.documento.file.name}
        </p>
      )}
    </div>

    {/* Certificado Bancario */}
    <div>
      <label className={labelBaseClasses}>Certificado Bancario (PDF, PNG o JPG)</label>
      <input
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        onChange={(e) => handleFileChange('certificadoBancario', e)}
        className={fileInputClasses}
      />
      {documentos.certificadoBancario.error && (
        <p className={errorClasses}>{documentos.certificadoBancario.error}</p>
      )}
      {documentos.certificadoBancario.file && (
        <p className={successMessageClasses}>
          Archivo seleccionado: {documentos.certificadoBancario.file.name}
        </p>
      )}
    </div>
  </div>
);

