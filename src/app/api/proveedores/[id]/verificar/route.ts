// src/app/api/proveedores/[id]/verificar/route.ts
import { NextResponse } from 'next/server';
import Airtable from 'airtable';

// Configuración inicial de Airtable
const base = new Airtable({ 
  apiKey: process.env.AIRTABLE_API_KEY 
}).base(process.env.AIRTABLE_BASE_ID!);

// Interface para tipado seguro
interface ProveedorFields {
  Estado?: string;
  nombreCompleto?: string;
  Nombres?: string;
  Apellidos?: string;
  [key: string]: unknown;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Validación básica del ID
    if (!params.id || typeof params.id !== 'string') {
      return NextResponse.json(
        { error: 'ID de proveedor inválido' },
        { status: 400 }
      );
    }

    // Consulta a Airtable con manejo de errores específico
    const record = await base('Proveedores').find(params.id).catch(error => {
      console.error('Error de Airtable:', error);
      throw new Error('Error al conectar con la base de datos');
    });

    if (!record || !record.fields) {
      return NextResponse.json(
        { error: 'Registro de proveedor corrupto' },
        { status: 404 }
      );
    }

    const fields = record.fields as ProveedorFields;
    
    // Construcción de respuesta con valores por defecto
    const responseData = {
      success: true,
      estado: fields.Estado || 'Pendiente',
      nombreCompleto: fields.nombreCompleto || 
        `${fields.Nombres || ''} ${fields.Apellidos || ''}`.trim()
    };

    // Validación de estado mínimo
    if (!responseData.nombreCompleto) {
      console.warn('Proveedor sin nombre completo:', params.id);
    }

    return NextResponse.json(responseData, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    });

  } catch (error: unknown) {
    console.error(`Error al verificar proveedor ${params.id}:`, error);
    
    const statusCode = error.message.includes('conectar') ? 503 : 500;
    
    return NextResponse.json(
      { 
        error: error.message || 'Error al verificar el proveedor',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: statusCode }
    );
  }
}