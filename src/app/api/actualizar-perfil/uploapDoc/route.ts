import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { v2 as cloudinary } from 'cloudinary';
import Airtable from 'airtable';

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

// Configurar Airtable
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

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'proveedores';

    if (!file) {
      return NextResponse.json(
        { error: 'No se proporcionó ningún archivo.' },
        { status: 400 }
      );
    }

    // Convertir archivo a buffer para subirlo a Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Subir a Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder, resource_type: 'auto' },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });

    const secureUrl = (result as any).secure_url;

    if (!secureUrl) {
      throw new Error('No se pudo obtener la URL del archivo en Cloudinary.');
    }

    // Actualizar Airtable en la columna "ArchivosCorregidos" del proveedor
    await base('Proveedores').update([
      {
        id: proveedorId,
        fields: {
          ArchivosCorregidos: secureUrl
        }
      }
    ]);

    return NextResponse.json({
      success: true,
      message: 'Archivo subido y actualizado en Airtable',
      secure_url: secureUrl
    });

  } catch (error) {
    console.error('Error al subir el archivo y actualizar Airtable:', error);
    return NextResponse.json(
      {
        error: 'Error en el proceso',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
