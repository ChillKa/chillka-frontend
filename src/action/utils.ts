import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { ZodSchema, infer as zodInfer } from 'zod';

/**
 * Validates the given data against the provided Zod schema and returns the parsed data.
 *
 * @param schema - The Zod schema to validate against. This schema defines the shape and rules for the data.
 * @param data - The data to be validated. The type of the data is inferred from the schema.
 *
 * @returns The validated and parsed data, conforming to the structure defined by the schema.
 * @throws {Error} Throws an error if validation fails, with a detailed message of what went wrong.
 *
 * @example
 * ```typescript
 * const userSchema = z.object({
 *   name: z.string(),
 *   age: z.number().positive()
 * });
 *
 * try {
 *   const userData = validateWithSchema(userSchema, { name: "John Doe", age: 30 });
 *   console.log(userData);
 * } catch (error) {
 *   console.error(error);
 * }
 * ```
 *
 */
export function validateWithSchema<T extends ZodSchema>(
  schema: T,
  data: zodInfer<T>
): zodInfer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `Fields format is wrong. ${result.error.errors
        .map((e) => `${e.path.join('.')}: ${e.message}`)
        .join(', ')}`
    );
  }

  return result.data;
}

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

export const getJwtPayload = async () => {
  const sessionCookie = getSessionCookie();
  if (!sessionCookie) return null;

  const { payload } = await jwtVerify(
    sessionCookie,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload;
};
