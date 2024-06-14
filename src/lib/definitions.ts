import { z } from 'zod';

export const endpoint = process.env.API_ENDPOINT;
export const REQUIRED_FIELD_MESSAGE = '此欄位為必填';
export const MAX_LENGTH_MESSAGE = (length: number) =>
  `最多不得超過${length}個字元`;
export const MIN_LENGTH_MESSAGE = (length: number) => `最少需要${length}個字元`;
export const VALID_EMAIL_MESSAGE = '請輸入有效的電子郵件地址';

export type FormState =
  | {
      status?: 'success' | 'failed';
      message: string;
      fields?: Record<string, string>;
      issues?: string[];
    }
  | undefined;

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: REQUIRED_FIELD_MESSAGE })
    .max(50, { message: MAX_LENGTH_MESSAGE(50) })
    .email({ message: VALID_EMAIL_MESSAGE }),
  password: z
    .string()
    .min(8, { message: MIN_LENGTH_MESSAGE(8) })
    .max(50, { message: MAX_LENGTH_MESSAGE(50) }),
});

export const registerFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: REQUIRED_FIELD_MESSAGE })
    .max(50, { message: MAX_LENGTH_MESSAGE(50) })
    .email({ message: VALID_EMAIL_MESSAGE }),
  password: z
    .string()
    .min(8, { message: MIN_LENGTH_MESSAGE(8) })
    .max(50, { message: MAX_LENGTH_MESSAGE(50) }),
  confirmPassword: z
    .string()
    .min(8, { message: MIN_LENGTH_MESSAGE(8) })
    .max(50, { message: MAX_LENGTH_MESSAGE(50) }),
  displayName: z
    .string()
    .min(2, { message: MIN_LENGTH_MESSAGE(2) })
    .max(50, { message: MAX_LENGTH_MESSAGE(50) }),
});

export const forgotPasswordFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: REQUIRED_FIELD_MESSAGE })
    .max(50, { message: MAX_LENGTH_MESSAGE(50) })
    .email({ message: VALID_EMAIL_MESSAGE }),
});

export const resetPasswordFormSchema = z.object({
  password: z
    .string()
    .min(8, { message: MIN_LENGTH_MESSAGE(8) })
    .max(50, { message: MAX_LENGTH_MESSAGE(50) }),
  confirmPassword: z
    .string()
    .min(8, { message: MIN_LENGTH_MESSAGE(8) })
    .max(50, { message: MAX_LENGTH_MESSAGE(50) }),
});

export const userFormSchema = z.object({
  displayName: z
    .string()
    .min(2, { message: MIN_LENGTH_MESSAGE(2) })
    .max(50, { message: MAX_LENGTH_MESSAGE(50) }),
});
