'use server';

import {
  endpoint,
  loginFormSchema,
  registerFormSchema,
} from '@lib/definitions';
import { cookies } from 'next/headers';
import { z } from 'zod';

export type FormState =
  | {
      status?: 'success' | 'failed';
      message: string;
      fields?: Record<string, string>;
      issues?: string[];
    }
  | undefined;

export async function login(
  data: z.infer<typeof loginFormSchema>
): Promise<FormState> {
  const validatedFields = loginFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      status: 'failed',
      message: 'Fields format is wrong',
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
      const errorMessage = await response.text();

      return {
        status: 'failed',
        message: `${errorMessage ?? 'Login failed'} (${response.status})`,
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
      status: 'success',
      message: 'success login',
    };
  } catch (error) {
    return {
      status: 'failed',
      message: (error as Error).message,
    };
  }
}

export async function register(
  data: z.infer<typeof registerFormSchema>
): Promise<FormState> {
  const validatedFields = registerFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      status: 'failed',
      message: 'Fields format is wrong',
    };
  }

  const { email, password, displayName } = validatedFields.data;

  try {
    const response = await fetch(`${endpoint}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, displayName }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return {
        status: 'failed',
        message: `${errorMessage ?? 'Register failed'} (${response.status})`,
      };
    }

    return {
      status: 'success',
      message: 'success register',
    };
  } catch (error) {
    return {
      status: 'failed',
      message: (error as Error).message,
    };
  }
}

export async function logout(): Promise<void> {
  cookies().set('session', '', { expires: new Date(0), path: '/' });
}

export async function getSession(): Promise<any> {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  return { token: session };
}
