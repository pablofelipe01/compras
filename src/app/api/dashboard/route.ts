// src/app/api/dashboard/route.ts
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

    // Primero obtener el IDENTIFICACIÓN del proveedor
    const proveedor = await base('Proveedores').find(proveedorId);
    const identificacion = proveedor.fields['IDENTIFICACIÓN'];

    console.log('IDENTIFICACIÓN del proveedor:', identificacion);

    // Ahora buscar las cuentas de cobro usando la IDENTIFICACIÓN
    const records = await base('CuentasCobro')
      .select({
        filterByFormula: `{Proveedor} = '${identificacion}'`
      })
      .all();

    console.log('Registros encontrados:', records.length);
    console.log('Registros:', records.map(r => ({
      id: r.id,
      proveedor: r.fields.Proveedor,
      fecha: r.fields.Fecha,
      estado: r.fields.Estado,
      valor: r.fields.ValorTotal
    })));

    const dashboardData = {
      totalCuentas: records.length,
      pendientes: records.filter(r => r.fields.Estado === 'Pendiente').length,
      aprobadas: records.filter(r => r.fields.Estado === 'Aprobada').length,
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