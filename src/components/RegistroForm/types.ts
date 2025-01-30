// src/components/RegistroForm/types.ts
import { z } from 'zod';
import { registroSchema } from '@/types/schema';

export type Registro = z.infer<typeof registroSchema>;

export interface FileUploadState {
 file: File | null;
 uploading: boolean;
 error: string | null;
 progress: number;
}

export interface DocumentosState {
 rut: FileUploadState;
 documento: FileUploadState;
 certificadoBancario: FileUploadState;
}

export interface RegistroFormHandle {
 setFormData: (data: Registro) => void;
 setDocuments: (docs: Record<string, File>) => void;
}

// Props del componente
export type RegistroFormProps = {
 onSuccess?: () => void;
 onError?: (error: Error) => void;
};