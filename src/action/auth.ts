'use server';

import {
  FormState,
  endpoint,
  forgotPasswordFormSchema,
  loginFormSchema,
  registerFormSchema,
  resetPasswordFormSchema,
} from '@lib/definitions';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  clearSessionCookie,
  fetchAPI,
  getSessionCookie,
  setSessionCookie,
  validateWithSchema,
} from './utils';

export async function login(
  data: z.infer<typeof loginFormSchema>
): Promise<FormState> {
  try {
    const validatedData = validateWithSchema(loginFormSchema, data);

    const response = await fetchAPI({
      api: '/login',
      method: 'POST',
      data: validatedData,
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
  try {
    const validatedData = validateWithSchema(registerFormSchema, data);

    const response = await fetchAPI({
      api: '/register',
      method: 'POST',
      data: validatedData,
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

export async function googleOAuth(): Promise<void> {
  redirect(`${endpoint}/google-oauth`);
}

export async function forgotPassword(
  data: z.infer<typeof forgotPasswordFormSchema>
): Promise<FormState> {
  try {
    const validatedData = validateWithSchema(forgotPasswordFormSchema, data);

    const response = await fetchAPI({
      api: '/reset-password',
      method: 'POST',
      data: validatedData,
    });

    if (!response.ok) {
      const errorMessage = await response.text();

      return {
        status: 'failed',
        message: `${errorMessage ?? '發送重設密碼信件失敗，請重新再試。'} (${response.status})`,
      };
    }

    return {
      status: 'success',
      message: '已寄送重設密碼信件，請至信箱查看。',
    };
  } catch (error) {
    return {
      status: 'failed',
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

export async function resetPassword(
  token: string,
  data: z.infer<typeof resetPasswordFormSchema>
): Promise<FormState> {
  try {
    const validatedData = validateWithSchema(resetPasswordFormSchema, data);

    const response = await fetchAPI({
      api: '/reset-password',
      method: 'PATCH',
      data: {
        token,
        ...validatedData,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();

      return {
        status: 'failed',
        message: `${errorMessage ?? '重設密碼失敗，請重新再試。'} (${response.status})`,
      };
    }

    return {
      status: 'success',
      message: '密碼重設成功，請重新登入。',
    };
  } catch (error) {
    return {
      status: 'failed',
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}
