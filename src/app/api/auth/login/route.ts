// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID!);

export async function POST(request: Request) {
  try {
    const { documento } = await request.json();

    // Buscar proveedor por número de documento
    const records = await base('Proveedores').select({
      filterByFormula: `{NumeroDocumento} = '${documento}'`,
      maxRecords: 1
    }).firstPage();

    if (records.length === 0) {
      return NextResponse.json(
        { error: 'Proveedor no encontrado' },
        { status: 404 }
      );
    }

    const proveedor = records[0];
    const cookieMaxAge = 7 * 24 * 60 * 60; // 1 semana en segundos

    // Configurar la respuesta con la cookie
    const response = NextResponse.json({
      success: true,
      proveedor: {
        id: proveedor.id,
        nombreCompleto: proveedor.fields.nombreCompleto || 
          `${proveedor.fields.Nombres} ${proveedor.fields.Apellidos}`,
        estado: proveedor.fields.Estado || 'Activo'
      }
    });

    // Establecer la cookie en los headers
    response.cookies.set({
      name: 'proveedorId',
      value: proveedor.id,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: cookieMaxAge,
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { error: 'Error al procesar el login' },
      { status: 500 }
    );
  }
}