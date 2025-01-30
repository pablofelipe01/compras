// src/components/CuentaCobroForm/SignaturePad.tsx
'use client'
import { useRef, useEffect } from 'react';
import SignaturePadLib from 'signature_pad';

interface SignaturePadProps {
  onSave: (signature: string) => void;
}

export function SignatureComponent({ onSave }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const padRef = useRef<SignaturePadLib | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Función para ajustar el tamaño del canvas
    const resizeCanvas = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper || !canvas) return;

      // Obtener el tamaño del contenedor
      const rect = wrapper.getBoundingClientRect();
      
      // Establecer el tamaño del canvas con un factor de escala para mayor resolución
      const scale = window.devicePixelRatio || 1;
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
      
      // Escalar el contexto para mantener la relación de aspecto
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(scale, scale);
      }
      
      // Mantener el tamaño visual correcto
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      // Reiniciar SignaturePad si ya existía
      if (padRef.current) {
        padRef.current.clear();
      }

      // Crear nueva instancia con opciones optimizadas
      padRef.current = new SignaturePadLib(canvas, {
        minWidth: 0.5,
        maxWidth: 2.5,
        throttle: 16, // 60fps
        penColor: 'rgb(0, 0, 0)',
        backgroundColor: 'rgb(255, 255, 255)'
      });
    };

    // Ajustar tamaño inicial
    resizeCanvas();

    // Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      padRef.current?.off();
    };
  }, []);

  const handleClear = () => {
    padRef.current?.clear();
  };

  const handleSave = () => {
    if (!padRef.current || padRef.current.isEmpty()) {
      alert('Por favor firme antes de guardar');
      return;
    }
    
    const dataUrl = padRef.current.toDataURL('image/png');
    onSave(dataUrl);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">Firma Digital</h3>
      
      <div className="border rounded-lg p-4 bg-white">
        <div 
          ref={wrapperRef} 
          className="w-full h-48 relative"
        >
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 border border-gray-300 rounded touch-none cursor-crosshair"
          />
        </div>
        
        <div className="mt-4 flex space-x-4">
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Limpiar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Guardar Firma
          </button>
        </div>
      </div>
    </div>
  );
}