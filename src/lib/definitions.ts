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
    .min(1, { message: 'This field has to be filled.' })
    .max(50)
    .email(),
  password: z.string().min(8).max(50),
});

export const registerFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .max(50)
    .email(),
  password: z.string().min(8).max(50),
  confirmPassword: z.string().min(8).max(50),
  displayName: z.string().min(1).max(50),
});

export const userFormSchema = z.object({
  displayName: z
    .string()
    .min(2, { message: 'The min is 2' })
    .max(50, { message: 'The max is 2' }),
});
