// src/components/RegistroForm/submitHandler.ts
import { uploadHandlers } from './uploadHandlers';
import { DocumentosState, Registro } from './types';

export const createSubmitHandler = (
  setIsSubmitting: (value: boolean) => void,
  documentos: DocumentosState,
  tipoPersona: string
) => {
  return async (data: Registro) => {
    try {
      setIsSubmitting(true);

      // Subir documentos
      const { rutUrl, documentoUrl, certificadoBancarioUrl } = 
        await uploadHandlers.uploadAllDocuments(documentos);

      // Preparar datos para Airtable
      const airtableData = {
        ...data,
        rutUrl,
        documentoUrl,
        certificadoBancarioUrl,
        nombreCompleto: tipoPersona === 'Natural' 
          ? `${data.nombres} ${data.apellidos}`
          : data.razonSocial
      };

      // Enviar a API
      const response = await fetch('/api/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(airtableData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al registrar en Airtable');
      }

      window.location.href = '/registro-exitoso';
    } catch (error) {
      console.error('Error en el registro:', error);
      alert(error instanceof Error ? error.message : 'Error durante el registro');
    } finally {
      setIsSubmitting(false);
    }
  };
};