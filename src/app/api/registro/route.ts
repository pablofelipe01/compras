// src/app/api/registro/route.ts
import { NextResponse } from 'next/server';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID!);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Log para depuración
    console.log('Datos recibidos:', data);

    // Validación básica de URLs
    if (!data.rutUrl || !data.documentoUrl || !data.certificadoBancarioUrl) {
      console.error('Faltan URLs de documentos:', data);
      throw new Error('Todos los documentos son requeridos');
    }
    
    // Crear registro en Airtable
    const record = await base('Proveedores').create([
      {
        fields: {
          TipoPersona: data.tipoPersona,
          TipoDocumento: data.tipoDocumento,
          NumeroDocumento: data.numeroDocumento,
          Nombres: data.nombres,
          Apellidos: data.apellidos,
          Telefono: data.telefono,
          Direccion: data.direccion,
          Ciudad: data.ciudad,
          Departamento: data.departamento,
          CorreoElectronico: data.correoElectronico,
          ServicioDescripcion: data.servicioDescripcion,
          Banco: data.banco,
          NumeroCuenta: data.numeroCuenta,
          TipoCuenta: data.tipoCuenta,
          RutUrl: data.rutUrl,
          DocumentoUrl: data.documentoUrl,
          CertificadoBancarioUrl: data.certificadoBancarioUrl,
          // Removemos FechaRegistro ya que es computado en Airtable
        },
      },
    ]);

    // Log de éxito
    console.log('Registro creado exitosamente:', record[0].id);

    return NextResponse.json({ success: true, recordId: record[0].id });
  } catch (error) {
    console.error('Error detallado:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error al procesar el registro' },
      { status: 500 }
    );
  }
}