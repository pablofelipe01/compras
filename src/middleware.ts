import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected paths more precisely
const PROTECTED_PATHS = [
  '/dashboard',
  '/cuentas-cobro',
  '/proveedores'
];

export async function middleware(request: NextRequest) {
  // Check if path should be protected
  const isProtectedPath = PROTECTED_PATHS.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (!isProtectedPath) {
    return NextResponse.next();
  }

  try {
    // Get the session cookie
    const proveedorId = request.cookies.get('proveedorId')?.value;
    
    if (!proveedorId) {
      console.log('No proveedorId cookie found');
      return redirectToLogin(request);
    }

    // Make the verification request
    const verifyResponse = await fetch(`${request.nextUrl.origin}/api/auth/verify`, {
      headers: {
        'Cookie': `proveedorId=${proveedorId}`,
        'Cache-Control': 'no-cache'
      }
    });

    if (!verifyResponse.ok) {
      console.error('Verify response not OK:', verifyResponse.status);
      return redirectToLogin(request);
    }

    const data = await verifyResponse.json();
    
    if (data.error || !data.estado) {
      console.error('Invalid verification data:', data);
      return redirectToLogin(request);
    }

    if (data.estado !== 'Activo' && data.estado !=='Pendiente') {
      return redirectToAccessDenied(request, 'account_status');
    }

    // Add verification headers to the response
    const response = NextResponse.next();
    response.headers.set('x-proveedor-verified', 'true');
    return response;

  } catch (error) {
    console.error('Middleware error:', error);
    return redirectToLogin(request);
  }
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

function redirectToAccessDenied(request: NextRequest, reason: string) {
  const deniedUrl = new URL('/acceso-denegado', request.url);
  deniedUrl.searchParams.set('reason', reason);
  return NextResponse.redirect(deniedUrl);
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/cuentas-cobro/:path*',
    '/proveedores/:path*',
  ]
};