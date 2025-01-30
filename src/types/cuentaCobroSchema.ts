// src/types/cuentaCobroSchema.ts
import { z } from 'zod';

// Enums
export const estadoCuentaCobroEnum = z.enum(['Pendiente', 'Aprobada', 'Rechazada', 'Pagada']);

// Schema principal
export const cuentaCobroSchema = z.object({
  proveedorId: z.string(),
  fecha: z.date(),

  // Items
  item1_descripcion: z.string().optional(),
  item1_valor: z.number().min(0).optional(),
  item2_descripcion: z.string().optional(),
  item2_valor: z.number().min(0).optional(),
  item3_descripcion: z.string().optional(),
  item3_valor: z.number().min(0).optional(),
  item4_descripcion: z.string().optional(),
  item4_valor: z.number().min(0).optional(),
  item5_descripcion: z.string().optional(),
  item5_valor: z.number().min(0).optional(),
  item6_descripcion: z.string().optional(),
  item6_valor: z.number().min(0).optional(),
  item7_descripcion: z.string().optional(),
  item7_valor: z.number().min(0).optional(),
  item8_descripcion: z.string().optional(),
  item8_valor: z.number().min(0).optional(),
  item9_descripcion: z.string().optional(),
  item9_valor: z.number().min(0).optional(),
  item10_descripcion: z.string().optional(),
  item10_valor: z.number().min(0).optional(),

  // Documentos
  parafiscalesUrl: z.string().url(),
  firmaUrl: z.string().url(),
  
  // Estado
  estado: estadoCuentaCobroEnum.default('Pendiente')
});

// Tipo para TypeScript
export type CuentaCobro = z.infer<typeof cuentaCobroSchema>;