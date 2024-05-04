'use server';

import {
  endpoint,
  loginFormSchema,
  registerFormSchema,
} from '@lib/definitions';
import { cookies } from 'next/headers';

export type FormState =
  | {
      status?: 'success' | 'failed';
      message: string;
      fields?: Record<string, string>;
      issues?: string[];
    }
  | undefined;

export async function login(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = loginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    const fields: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      fields[key] = formData.get(key)?.toString() ?? '';
    });

    return {
      status: 'failed',
      message: 'Fields format is wrong',
      fields,
      issues: validatedFields.error.issues.map((issue) => issue.message),
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
        status: 'failed',
        message: 'Failed to login',
        fields: validatedFields.data,
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
      fields: validatedFields.data,
    };
  } catch (error) {
    return {
      status: 'failed',
      message: (error as Error).message,
      fields: validatedFields.data,
    };
  }
}

export async function register(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = registerFormSchema.safeParse({
    displayName: formData.get('displayName'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    const fields: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      fields[key] = formData.get(key)?.toString() ?? '';
    });

    return {
      status: 'failed',
      message: 'Fields format is wrong',
      fields,
      issues: validatedFields.error.issues.map((issue) => issue.message),
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
      return {
        status: 'failed',
        message: 'Registration failed',
        fields: validatedFields.data,
      };
    }

    return {
      status: 'success',
      message: 'success register',
      fields: validatedFields.data,
    };
  } catch (error) {
    return {
      status: 'failed',
      message: (error as Error).message,
      fields: validatedFields.data,
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
