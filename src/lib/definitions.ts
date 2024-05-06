import { z } from 'zod';

export const endpoint = process.env.API_ENDPOINT;

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
  displayName: z.string().min(1).max(50),
});
