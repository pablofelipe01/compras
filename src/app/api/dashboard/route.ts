import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID!);

export async function GET() {
  try {
    const cookieStore = await cookies();
    const proveedorId = cookieStore.get('proveedorId')?.value;

    if (!proveedorId) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    console.log('Buscando proveedor:', proveedorId);

    // Obtener los datos del proveedor
    const proveedor = await base('Proveedores').find(proveedorId);
    const identificacion = proveedor.fields['IDENTIFICACIÓN'];
    const comentarios = proveedor.fields['Comentarios'] || ''; // Guardar el valor de Comentarios

    console.log('IDENTIFICACIÓN del proveedor:', identificacion);
    console.log('Comentarios del proveedor:', comentarios);

    // Buscar las cuentas de cobro usando la IDENTIFICACIÓN
    const records = await base('CuentasCobro')
      .select({
        filterByFormula: `{Proveedor} = '${identificacion}'`
      })
      .all();

    console.log('Registros encontrados:', records.length);

    const dashboardData = {
      totalCuentas: records.length,
      pendientes: records.filter(r => r.fields.Estado === 'Pendiente').length,
      aprobadas: records.filter(r => r.fields.Estado === 'Aprobada').length,
      comentariosProveedor: comentarios, // Agregar comentarios a la respuesta
      cuentasRecientes: records.map(record => ({
        id: record.id,
        fecha: record.fields.Fecha,
        estado: record.fields.Estado,
        valorTotal: record.fields.ValorTotal || 0,
        descripcion: record.fields.Item1_Descripcion || ''
      }))
    };

    console.log('Datos procesados:', dashboardData);

    return NextResponse.json({
      success: true,
      ...dashboardData
    });

  } catch (error) {
    console.error('Error completo en dashboard:', error);
    if (error instanceof Error) {
      console.error('Stack:', error.stack);
    }
    return NextResponse.json(
      { error: 'Error al obtener datos del dashboard' },
      { status: 500 }
    );
  }
}
