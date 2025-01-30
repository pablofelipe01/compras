import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Configuración de rutas protegidas
const PROTECTED_PATHS = [
  '/dashboard',
  '/cuentas-cobro',
  '/api/(?!auth|public).*' // Protege todas las APIs excepto auth y public
];

// Interface para respuesta de verificación
interface VerifyResponse {
  estado: 'Activo' | 'Inactivo' | 'Pendiente';
  error?: string;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Verificar si la ruta está protegida
  const isProtected = PROTECTED_PATHS.some(pattern => 
    new RegExp(`^${pattern.replace(/\*/g, '.*')}$`).test(pathname)
  );

  if (!isProtected) return NextResponse.next();

  try {
    const proveedorId = request.cookies.get('proveedorId')?.value;
    console.log('Cookie proveedorId:', proveedorId);
    
    if (!proveedorId) throw new Error('No hay sesión activa');

    const verifyUrl = new URL('/api/auth/verify', request.nextUrl.origin);
    console.log('Verificando en URL:', verifyUrl.toString());
    
    const verifyResponse = await fetch(verifyUrl.toString(), {
      headers: { Cookie: request.headers.get('Cookie') || '' }
    });

    if (!verifyResponse.ok) {
      const errorText = await verifyResponse.text();
      console.error('Respuesta no OK:', {
        status: verifyResponse.status,
        statusText: verifyResponse.statusText,
        body: errorText
      });
      throw new Error(`Error en verificación: ${verifyResponse.status}`);
    }

    const data = await verifyResponse.json() as VerifyResponse; // Aquí usamos la interfaz
    console.log('Datos recibidos en middleware:', data);

    // Verificar la estructura de datos
    if (!data || typeof data.estado === 'undefined') {
      console.error('Estructura de datos inválida:', data);
      throw new Error('Respuesta inválida del servidor');
    }

    if (data.estado !== 'Activo') {
      console.log('Estado no activo:', data.estado);
      const deniedUrl = new URL('/acceso-denegado', request.url);
      deniedUrl.searchParams.set('reason', 'account_status');
      return NextResponse.redirect(deniedUrl);
    }

    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    
    return response;

  } catch (error: unknown) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Middleware Error:', {
        path: pathname,
        error: error instanceof Error ? {
          message: error.message,
          stack: error.stack
        } : error
      });
    }

    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    if (error instanceof Error) {
      loginUrl.searchParams.set('error', 'session_expired');
    }

    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('proveedorId');
    
    return response;
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/cuentas-cobro/:path*',
    '/((?!_next/static|_next/image|favicon.ico|login|acceso-denegado).*)'
  ]
};