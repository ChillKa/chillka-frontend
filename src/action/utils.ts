import { cookies } from 'next/headers';

export const getSessionCookie = (): string | null => {
  const sessionCookie = cookies().get('session')?.value;

  if (!sessionCookie) return null;

  return sessionCookie;
};

export const setSessionCookie = (token: string, expiresIn: number) => {
  const expires = new Date(Date.now() + expiresIn * 1000); // expiresIn is expected in seconds
  cookies().set('session', token, {
    httpOnly: true,
    expires,
    path: '/',
  });
};

export const clearSessionCookie = () => {
  cookies().set('session', '', { expires: new Date(0), path: '/' });
};
