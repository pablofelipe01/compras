// src/app/api/cuentas-cobro/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
 .base(process.env.AIRTABLE_BASE_ID!);

export async function POST(request: Request) {
 try {
   const cookieStore = await cookies();
   const proveedorId = cookieStore.get('proveedorId')?.value;

   if (!proveedorId) {
     return NextResponse.json(
       { error: 'No autenticado' },
       { status: 401 }
     );
   }

   const data = await request.json();
   console.log('Received data:', data);

   const record = await base('CuentasCobro').create([
     {
       fields: {
         Proveedor: [proveedorId],
         Fecha: data.fecha,
         Estado: data.estado,
         Item1_Descripcion: data.item1_descripcion || '',
         Item1_Valor: data.item1_valor || 0,
         Item2_Descripcion: data.item2_descripcion || '',
         Item2_Valor: data.item2_valor || 0,
         Item3_Descripcion: data.item3_descripcion || '',
         Item3_Valor: data.item3_valor || 0,
         Item4_Descripcion: data.item4_descripcion || '',
         Item4_Valor: data.item4_valor || 0,
         Item5_Descripcion: data.item5_descripcion || '',
         Item5_Valor: data.item5_valor || 0,
         ParafiscalesUrl: data.parafiscalesUrl || '',
         FirmaUrl: data.firmaUrl || ''
       }
     }
   ]);

   return NextResponse.json({
     success: true,
     recordId: record[0].id
   });

 } catch (error) {
   console.error('Error creating cuenta de cobro:', error);
   return NextResponse.json(
     { 
       error: 'Error al crear la cuenta de cobro',
       details: error instanceof Error ? error.message : 'Error desconocido'
     },
     { status: 500 }
   );
 }
}

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

    console.log('Buscando cuentas de cobro para proveedor:', proveedorId);

    // Modificar la fórmula de filtro
    const records = await base('CuentasCobro')
      .select({
        // ARRAYJOIN es necesario para campos de tipo Link en Airtable
        filterByFormula: `ARRAYJOIN(Proveedor) = '${proveedorId}'`,
        sort: [{ field: 'Fecha', direction: 'desc' }]
      })
      .all();

    console.log('Registros sin procesar:', records.map(r => ({
      id: r.id,
      proveedor: r.fields.Proveedor,
      fecha: r.fields.Fecha,
      estado: r.fields.Estado
    })));

    const cuentasCobro = records.map(record => {
      console.log('Procesando registro:', record.fields);
      return {
        id: record.id,
        fecha: record.fields.Fecha,
        estado: record.fields.Estado,
        valorTotal: record.fields.ValorTotal || 0,
        item1_descripcion: record.fields.Item1_Descripcion || '',
        item1_valor: record.fields.Item1_Valor || 0,
        parafiscalesUrl: record.fields.ParafiscalesUrl || '',
        firmaUrl: record.fields.FirmaUrl || ''
      };
    });

    console.log('Datos procesados finales:', cuentasCobro);

    return NextResponse.json({
      success: true,
      cuentasCobro
    });

  } catch (error) {
    console.error('Error completo al obtener cuentas de cobro:', error);
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace available');
    return NextResponse.json(
      { 
        error: 'Error al obtener las cuentas de cobro',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

// Función auxiliar para verificar si el proveedor existe y está activo
async function verifyProveedor(proveedorId: string): Promise<boolean> {
 try {
   const record = await base('Proveedores').find(proveedorId);
   return record.fields.Estado === 'Activo';
 } catch {
   return false;
 }
}