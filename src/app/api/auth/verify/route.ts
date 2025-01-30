// src/app/api/auth/verify/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID!);

export async function GET() {
  try {
    const cookieStore = await cookies();
    const proveedorId = cookieStore.get('proveedorId')?.value;
    console.log('ProveedorId recibido en verify:', proveedorId);
    
    if (!proveedorId) {
      console.log('No hay proveedorId en la cookie');
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    console.log('Buscando en Airtable con ID:', proveedorId);
    const record = await base('Proveedores').find(proveedorId);
    console.log('Fields del record:', record.fields);
    
    const response = {
      estado: record.fields.Estado || 'Inactivo',
      proveedor: {
        id: proveedorId,
        nombreCompleto: record.fields.nombreCompleto || 
          `${record.fields.Nombres} ${record.fields.Apellidos}`,
        estado: record.fields.Estado || 'Inactivo'
      }
    };

    console.log('Respuesta a enviar:', response);
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Error completo en verificación:', error);
    return NextResponse.json(
      { error: 'Error de verificación', details: error.message },
      { status: 500 }
    );
  }
}