'use server';

import {
  FormState,
  endpoint,
  loginFormSchema,
  registerFormSchema,
} from '@lib/definitions';
import { z } from 'zod';
import {
  clearSessionCookie,
  getSessionCookie,
  setSessionCookie,
} from './utils';

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
    setSessionCookie(result.token, 3600);

    return {
      status: 'success',
      message: 'Successfully logged in',
    };
  } catch (error) {
    return {
      status: 'failed',
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
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
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

export async function logout(): Promise<void> {
  clearSessionCookie();
}

export async function getSession(): Promise<{
  token: string;
} | null> {
  const token = getSessionCookie();

  return token
    ? {
        token,
      }
    : null;
}
