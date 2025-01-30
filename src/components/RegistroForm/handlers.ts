import { UseFormSetValue } from 'react-hook-form';
import { DocumentosState, Registro } from './types';
import { FILE_VALIDATION } from './styles';

export const createHandlers = (
 setValue: UseFormSetValue<Registro>,
 setDocumentos: React.Dispatch<React.SetStateAction<DocumentosState>>,
 ciudadesColombia: string[]
) => ({
 handleDepartamentoChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
   const departamento = e.target.value;
   setValue('departamento', departamento);
   setValue('ciudad', ciudadesColombia[0]);
 },

  handleFileChange: (
    tipo: keyof DocumentosState,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    
    if (file) {
      if (!FILE_VALIDATION.allowedTypes.includes(file.type)) {
        setDocumentos(prev => ({
          ...prev,
          [tipo]: {
            ...prev[tipo],
            file: null,
            error: FILE_VALIDATION.errorMessages.invalidType
          }
        }));
        return;
      }
      
      if (file.size > FILE_VALIDATION.maxSize) {
        setDocumentos(prev => ({
          ...prev,
          [tipo]: {
            ...prev[tipo],
            file: null,
            error: FILE_VALIDATION.errorMessages.maxSize
          }
        }));
        return;
      }

      setDocumentos(prev => ({
        ...prev,
        [tipo]: {
          file,
          uploading: false,
          error: null,
          progress: 0
        }
      }));
    }
  }
});