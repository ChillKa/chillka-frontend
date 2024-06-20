import { NextRequest, NextResponse } from 'next/server';

const middleware = (req: NextRequest) => {
  const url = req.nextUrl;
  const { pathname } = url;

  if (['/auth/login', '/auth/register'].includes(pathname)) {
    const response = NextResponse.next();
    const lastVisitedPath =
      req.headers.get('referer')?.replace(url.origin, '') || '/';

    if (!['/auth/login', '/auth/register'].includes(lastVisitedPath)) {
      response.cookies.set('last_visited_path', lastVisitedPath);
    }
    return response;
  }

  if (pathname === '/callback') {
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

  if (pathname === '/member-center') {
    return NextResponse.redirect(new URL('/member-center/ticket-inquiry', url));
  }

  return NextResponse.next();
};

export default middleware;
