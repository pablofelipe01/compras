import { NextResponse } from 'next/server';
import Airtable from 'airtable';

// Configurar Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID!);

export async function PUT(request: Request) {
  try {
    console.log('🔄 Iniciando actualización de perfil...');

    const formData = await request.json();
    console.log('📥 Datos recibidos del cliente:', JSON.stringify(formData, null, 2));

    // Extraer identificación y eliminar ID del objeto
    const { identificacion, id, ...updateFields } = formData;
    console.log('🔍 Identificación a buscar:', identificacion);
    console.log('📌 Datos originales a actualizar:', JSON.stringify(updateFields, null, 2));

    if (!identificacion) {
      console.error('⚠️ Error: Identificación no proporcionada.');
      return NextResponse.json(
        { error: 'Identificación requerida.' },
        { status: 400 }
      );
    }

    // Buscar proveedor en Airtable
    console.log('🔎 Buscando proveedor en Airtable...');
    const records = await base('Proveedores')
      .select({ filterByFormula: `{IDENTIFICACIÓN} = '${identificacion}'` })
      .firstPage();

    console.log('📄 Registros encontrados:', records.length);

    if (records.length === 0) {
      console.error('❌ Error: Proveedor no encontrado.');
      return NextResponse.json(
        { error: 'Proveedor no encontrado.' },
        { status: 404 }
      );
    }

    const proveedorId = records[0].id; // ID real del registro en Airtable
    console.log('✅ Proveedor encontrado. ID en Airtable:', proveedorId);

    // Mapeo de campos correctos en Airtable
    const validFieldsMap: Record<string, string> = {
      nombres: 'Nombres',
      apellidos: 'Apellidos',
      tipoDocumento: 'TipoDocumento',
      numeroDocumento: 'NumeroDocumento',
      telefono: 'Telefono',
      correoElectronico: 'CorreoElectronico',
      ciudad: 'Ciudad',
      banco: 'Banco',
      numeroCuenta: 'NumeroCuenta',
      tipoCuenta: 'TipoCuenta',
    };

    // Filtrar y renombrar campos para que coincidan con Airtable
    const filteredUpdateFields: Record<string, any> = {};
    Object.keys(updateFields).forEach((key) => {
      if (validFieldsMap[key]) {
        filteredUpdateFields[validFieldsMap[key]] = updateFields[key];
      }
    });

    console.log('📤 Campos filtrados antes de enviar a Airtable:', JSON.stringify(filteredUpdateFields, null, 2));

    if (Object.keys(filteredUpdateFields).length === 0) {
      console.error('⚠️ No hay campos válidos para actualizar.');
      return NextResponse.json(
        { error: 'No hay datos válidos para actualizar.' },
        { status: 400 }
      );
    }

    // Actualizar datos en Airtable
    console.log('🚀 Enviando actualización a Airtable...');
    await base('Proveedores').update([
      {
        id: proveedorId,
        fields: filteredUpdateFields,
      },
    ]);

    console.log('✅ Actualización completada con éxito.');

    return NextResponse.json({
      success: true,
      message: 'Datos actualizados correctamente.',
    });
  } catch (error) {
    console.error('🔥 Error al actualizar el perfil:', error);

    return NextResponse.json(
      {
        error: 'Error en el proceso',
        details: error instanceof Error ? error.message : 'Error desconocido',
      },
      { status: 500 }
    );
  }
}
