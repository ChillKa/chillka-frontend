'use server';

import { FormState, endpoint, loginFormSchema } from '@lib/definitions';
import { cookies } from 'next/headers';

export async function login(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = loginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const response = await fetch(`${endpoint}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return {
        message: 'Failed to login',
      };
    }

    const result = await response.json();

    const expires = new Date(Date.now() + 3600 * 1000); // 1 hour from now
    cookies().set('session', result.token, {
      httpOnly: true,
      expires,
      path: '/',
    });

    return {
      message: 'success login',
    };
  } catch (error) {
    return {
      message: (error as Error).message,
    };
  }
}

export async function register(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = loginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const response = await fetch(`${endpoint}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return {
        message: 'Registration failed',
      };
    }

    const result = await response.json();

    const expires = new Date(Date.now() + 3600 * 1000); // 1 hour from now
    cookies().set('session', result.token, {
      httpOnly: true,
      expires,
      path: '/',
    });

    return {
      message: 'success register',
    };
  } catch (error) {
    return {
      message: (error as Error).message,
    };
  }
}

// TODO: Just not to implement it
// export async function logout(): Promise<void> {
//   cookies().set('session', '', { expires: new Date(0), path: '/' });
// }

// export async function getSession(): Promise<any> {
//   const session = cookies().get('session')?.value;
//   if (!session) return null;
//   return { token: session };
// }

// export async function updateSession(
//   request: NextRequest
// ): Promise<NextResponse | undefined> {
//   const session = request.cookies.get('session')?.value;
//   if (!session) return undefined;

//   const expires = new Date(Date.now() + 3600 * 1000);
//   const res = NextResponse.next();
//   res.cookies.set({
//     name: 'session',
//     value: session,
//     httpOnly: true,
//     expires,
//   });
//   return res;
// }
