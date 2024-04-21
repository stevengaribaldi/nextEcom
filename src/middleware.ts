
import { NextRequest, NextResponse } from 'next/server';
import { getServerSideUser } from './lib/payload-utils';

function setCacheHeaders(response: NextResponse) {

  response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
}

export async function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  const { user } = await getServerSideUser(cookies);

  if (user && ['/login', '/create-account'].includes(nextUrl.pathname)) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/`);
  }

  const response = NextResponse.next();

  if (nextUrl.pathname.startsWith('/_next/static/')) {
    setCacheHeaders(response);
  }

  return response;
}
