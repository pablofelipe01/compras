// src/components/ActualizarForm/styles.ts

// Definimos las clases base para los elementos del formulario usando Tailwind
// Estas clases proporcionan un tema oscuro consistente y una buena experiencia de usuario

// Clase base para todos los inputs (text, email, tel, etc.)
export const inputBaseClasses = `
  mt-1 block w-full 
  rounded-md border-gray-600 bg-gray-700 
  text-white shadow-sm 
  focus:border-indigo-500 focus:ring-indigo-500
  placeholder-gray-400
  transition-colors duration-200
`;

// Clase base para las etiquetas, manteniendo consistencia visual
export const labelBaseClasses = `
  block text-sm font-medium text-gray-200
  mb-1
`;

// Clase para mensajes de error, asegurando buena visibilidad
export const errorClasses = `
  mt-1 text-sm text-red-400
  font-medium
`;

// Clase especial para inputs de tipo archivo
export const fileInputClasses = `
  ${inputBaseClasses}
  file:mr-4 file:py-2 file:px-4 
  file:rounded-full file:border-0 
  file:text-sm file:font-semibold 
  file:bg-gray-600 file:text-gray-200 
  hover:file:bg-gray-500
  cursor-pointer
`;

// Clase para mensajes de éxito (por ejemplo, cuando se selecciona un archivo)
export const successMessageClasses = `
  mt-2 text-sm text-green-400
  font-medium
`;

// Constantes relacionadas con la validación de archivos
export const FILE_VALIDATION = {
  maxSize: 5 * 1024 * 1024, // 5MB en bytes
  allowedTypes: ['application/pdf', 'image/png', 'image/jpeg'],
  allowedExtensions: ['.pdf', '.png', '.jpg', '.jpeg'],
  errorMessages: {
    invalidType: 'Formato no válido. Solo se permiten archivos PDF, PNG y JPG.',
    maxSize: 'El archivo excede el tamaño máximo permitido de 5MB.',
    required: 'Este documento es requerido.',
  }
};

// Constantes para estados del formulario
export const FORM_STATES = {
  idle: 'idle',
  submitting: 'submitting',
  success: 'success',
  error: 'error',
} as const;

// Clases para el botón de envío según su estado
export const submitButtonClasses = {
  base: `
    w-full flex justify-center py-3 px-4 
    border border-transparent rounded-md shadow-sm 
    text-sm font-medium text-white
    transition-colors duration-200
  `,
  enabled: `
    bg-indigo-600 hover:bg-indigo-700 
    focus:outline-none focus:ring-2 
    focus:ring-offset-2 focus:ring-indigo-500
  `,
  disabled: `
    bg-gray-400 cursor-not-allowed
  `,
};

// Mensajes del formulario
export const FORM_MESSAGES = {
  processing: 'Procesando...',
  register: 'Registrar',
  errorTitle: 'Hay errores en el formulario que necesitan ser corregidos',
  errorMessage: 'Por favor, revise todos los campos marcados en rojo.',
  successMessage: 'Registro completado exitosamente',
};