import { z } from 'zod';

export const endpoint = process.env.API_ENDPOINT;

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
    .min(1, { message: '此欄位為必填' })
    .max(50, { message: '不得超過50個字元' })
    .email({ message: '請輸入有效的電子郵件地址' }),
  password: z.string().min(8).max(50),
});

export const registerFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: '此欄位為必填' })
    .max(50, { message: '不得超過50個字元' })
    .email({ message: '請輸入有效的電子郵件地址' }),
  password: z.string().min(8).max(50),
  confirmPassword: z.string().min(8).max(50),
  displayName: z.string().min(1).max(50),
});

export const forgotPasswordFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: '此欄位為必填' })
    .max(50, { message: '不得超過50個字元' })
    .email({ message: '請輸入有效的電子郵件地址' }),
});

export const resetPasswordFormSchema = z.object({
  password: z.string().min(8).max(50),
  confirmPassword: z.string().min(8).max(50),
});

export const userFormSchema = z.object({
  displayName: z
    .string()
    .min(2, { message: '最少需要2個字元' })
    .max(50, { message: '最多不得超過50個字元' }),
});
