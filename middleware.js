import { NextResponse } from 'next/server';

export function middleware(request) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;

  // No credentials configured: keep the admin surface closed by default.
  if (!user || !pass) {
    return new NextResponse('Not found', { status: 404 });
  }

  const authHeader = request.headers.get('authorization');

  if (authHeader?.startsWith('Basic ')) {
    const decoded = Buffer.from(authHeader.slice(6), 'base64').toString('utf-8');
    const separatorIndex = decoded.indexOf(':');
    const reqUser = decoded.slice(0, separatorIndex);
    const reqPass = decoded.slice(separatorIndex + 1);

    if (reqUser === user && reqPass === pass) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Admin"' },
  });
}

export const config = {
  matcher: ['/admin/:path*'],
};
