// src/components/RegistroForm/components/SubmitButton.tsx
import React from 'react';

interface SubmitButtonProps {
  isSubmitting: boolean;
}

export const SubmitButton = ({ isSubmitting }: SubmitButtonProps) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className={`
      w-full flex justify-center py-3 px-4 border border-transparent 
      rounded-md shadow-sm text-sm font-medium text-white transition-colors
      ${isSubmitting 
        ? 'bg-gray-400 cursor-not-allowed' 
        : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      }
    `}
  >
    {isSubmitting ? <LoadingSpinner /> : 'Registrar'}
  </button>
);

const LoadingSpinner = () => (
  <>
    <svg 
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" cy="12" r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    Procesando...
  </>
);