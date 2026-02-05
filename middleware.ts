import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next()

  // Security Headers
  const securityHeaders = {
    // Prevent clickjacking
    'X-Frame-Options': 'DENY',

    // Prevent MIME type sniffing
    'X-Content-Type-Options': 'nosniff',

    // Referrer Policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',

    // Permissions Policy
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',

    // Content Security Policy - More secure with nonces for Next.js
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://images.unsplash.com https://plus.unsplash.com https://utfs.io https://picsum.photos https://placehold.co",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join('; '),
  };

  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // HSTS (HTTP Strict Transport Security) - only in production
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  // Protected admin routes - check for admin role
  if (pathname.startsWith('/admin')) {
    const { getToken } = await import('next-auth/jwt')
    const token = await getToken({
      req: request as any,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (!token) {
      const url = new URL('/auth/signin', request.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }

    if (token.role !== 'admin') {
      const url = new URL('/', request.url)
      url.searchParams.set('error', 'unauthorized')
      return NextResponse.redirect(url)
    }
  }

  // Protected user routes
  if (pathname.startsWith('/profile') || pathname.startsWith('/orders') || pathname.startsWith('/wishlist')) {
    const { getToken } = await import('next-auth/jwt')
    const token = await getToken({
      req: request as any,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (!token) {
      const url = new URL('/auth/signin', request.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }
  }

  // Rate limiting info
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  response.headers.set('X-RateLimit-IP', ip)

  return response
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
