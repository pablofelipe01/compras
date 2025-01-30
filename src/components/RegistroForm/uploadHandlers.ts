// src/components/RegistroForm/uploadHandlers.ts
import { DocumentosState } from '../types';

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  version: number;
  resource_type: string;
  format: string;
  bytes: number;
}

export const uploadHandlers = {
  uploadToCloudinary: async (file: File, folder: string): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'proveedores_app');
      formData.append('folder', folder);
      formData.append('public_id', `${folder}/${Date.now()}`);
      formData.append('resource_type', 'auto');

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error de Cloudinary:', errorData);
        throw new Error('Error al subir el archivo');
      }

      const data: CloudinaryResponse = await response.json();
      console.log('URL generada:', data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error('Error en uploadToCloudinary:', error);
      throw new Error('Error al subir el archivo a Cloudinary');
    }
  },

  uploadAllDocuments: async (documentos: DocumentosState) => {
    try {
      if (!documentos.rut.file || !documentos.documento.file || !documentos.certificadoBancario.file) {
        throw new Error('Todos los documentos son requeridos');
      }

      const [rutUrl, documentoUrl, certificadoBancarioUrl] = await Promise.all([
        uploadHandlers.uploadToCloudinary(documentos.rut.file, 'rut'),
        uploadHandlers.uploadToCloudinary(documentos.documento.file, 'documento'),
        uploadHandlers.uploadToCloudinary(documentos.certificadoBancario.file, 'certificado')
      ]);

      return {
        rutUrl,
        documentoUrl,
        certificadoBancarioUrl
      };
    } catch (error) {
      console.error('Error al subir documentos:', error);
      throw error;
    }
  }
};