import { isTokenExpiredOrError } from '@action/utils';
import { NextRequest, NextResponse } from 'next/server';

const handlePrivatePaths = async (req: NextRequest, url: URL) => {
  const tokenExpired = await isTokenExpiredOrError();

  if (tokenExpired) {
    const response = NextResponse.redirect(new URL('/auth/login', url));
    response.cookies.set('last_visited_path', url.pathname);
    response.cookies.delete('session');
    return response;
  }

  return NextResponse.next();
};

const handleAuthRelatedPaths = (req: NextRequest, url: URL) => {
  if (['/auth/login', '/auth/register'].includes(url.pathname)) {
    const response = NextResponse.next();
    const lastVisitedPath =
      req.headers.get('referer')?.replace(url.origin, '') || '/';

    if (!['/auth/login', '/auth/register'].includes(lastVisitedPath)) {
      response.cookies.set('last_visited_path', lastVisitedPath);
    }

    if (lastVisitedPath) return response;
  }

  if (url.pathname === '/callback') {
    const accessToken = url.searchParams.get('accessToken');
    const lastVisitedPath = req.cookies.get('last_visited_path')?.value;

    if (lastVisitedPath) {
      const response = NextResponse.redirect(new URL(lastVisitedPath, url));
      response.cookies.delete('last_visited_path');

      if (accessToken) {
        const expires = new Date(Date.now() + 3600 * 1000);
        response.cookies.set('session', accessToken, {
          httpOnly: true,
          expires,
          path: '/',
        });
      }
      return response;
    }
  }

  if (url.pathname === '/redirect') {
    const lastVisitedPath = req.cookies.get('last_visited_path')?.value;
    if (lastVisitedPath) {
      const response = NextResponse.redirect(new URL(lastVisitedPath, url));
      response.cookies.delete('last_visited_path');
      return response;
    }
  }

  return NextResponse.next();
};

const middleware = async (req: NextRequest) => {
  const url = req.nextUrl;
  const { pathname } = url;

  const authRelatedPaths = [
    '/auth/login',
    '/auth/register',
    '/callback',
    '/redirect',
  ];
  if (authRelatedPaths.includes(pathname)) {
    return handleAuthRelatedPaths(req, url);
  }

  const privatePaths = ['/member-center', '/activity/new'];
  if (privatePaths.some((path) => pathname.startsWith(path))) {
    return handlePrivatePaths(req, url);
  }

  if (pathname === '/member-center') {
    return NextResponse.redirect(new URL('/member-center/ticket-inquiry', url));
  }

  return NextResponse.next();
};

export default middleware;
