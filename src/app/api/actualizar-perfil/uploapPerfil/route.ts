// src\app\api\actualizar-perfil\uploapPerfil\route.ts
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
      const proveedorData = {
        id: proveedor.id,
        tipoPersona: proveedor.fields['TipoPersona'],
        tipoDocumento: proveedor.fields['TipoDocumento'],
        numeroDocumento: proveedor.fields['NumeroDocumento'],
        nombres: proveedor.fields['Nombres'],
        apellidos: proveedor.fields['Apellidos'],
        telefono: proveedor.fields['Telefono'],
        direccion: proveedor.fields['Direccion'],
        ciudad: proveedor.fields['Ciudad'],
        departamento: proveedor.fields['Departamento'],
        correoElectronico: proveedor.fields['CorreoElectronico'],
        servicioDescripcion: proveedor.fields['ServicioDescripcion'],
        banco: proveedor.fields['Banco'],
        numeroCuenta: proveedor.fields['NumeroCuenta'],
        tipoCuenta: proveedor.fields['TipoCuenta'],
        rutUrl: proveedor.fields['RutUrl'],
        estado: proveedor.fields['Estado'],
        cuentaCobro: proveedor.fields['CuentaCobro'],
        certificadoBancarioUrl: proveedor.fields['CertificadoBancarioUrl'],
        documentoUrl: proveedor.fields['DocumentoUrl'],
        comentarios: proveedor.fields['Comentarios'],
        archivosCorregidos: proveedor.fields['ArchivosCorregidos'],
        fechaRegistro: proveedor.fields['FechaRegistro'],
        identificacion: proveedor.fields['IDENTIFICACIÓN']
      };
  
      console.log('Campos del proveedor:', proveedorData);
  
      // Buscar las cuentas de cobro usando la IDENTIFICACIÓN
      const records = await base('CuentasCobro')
        .select({
          filterByFormula: `{Proveedor} = '${proveedorData.identificacion}'`
        })
        .all();
  
      console.log('Registros encontrados:', records.length);
  
      const dashboardData = {
        totalCuentas: records.length,
        pendientes: records.filter(r => r.fields.Estado === 'Pendiente').length,
        aprobadas: records.filter(r => r.fields.Estado === 'Aprobada').length,
        comentariosProveedor: proveedorData.comentarios, // Agregar comentarios a la respuesta
        cuentasRecientes: records.map(record => ({
          id: record.id,
          fecha: record.fields.Fecha,
          estado: record.fields.Estado,
          valorTotal: record.fields.ValorTotal || 0,
          descripcion: record.fields.Item1_Descripcion || '',
          observaciones: record.fields.ObservacionesCuentaCrobro || '' // ✅ Nueva columna agregada
        })),
        proveedorData, // Aquí agregamos todos los datos del proveedor
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
  
