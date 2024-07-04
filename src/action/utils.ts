import { endpoint } from '@lib/definitions';
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

  try {
    const { payload } = await jwtVerify(
      sessionCookie,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return payload;
  } catch (error) {
    console.error('JWT Verification Error:', error);
    throw new Error('JWT Verification Failed');
  }
};

interface FetchOptions<T> {
  api: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  data?: T;
  headers?: Record<string, string>;
  shouldAuth?: boolean;
  option?: RequestInit;
}

/**
 * Executes an Next fetch.
 *
 * @template T The expected type of the request payload.
 * @param {FetchOptions<T>} options - The options to configure the fetch request.
 * @returns {Promise<Response>} A promise that resolves to the raw fetch response.
 * @throws {Error} Throws an error if authentication is required but no session cookie is found.
 *
 * @example
 * ```typescript
 *   try {
 *     const response = await fetchAPI({
 *       api: '/data',
 *       method: 'GET',
 *       shouldAuth: true
 *     });
 *     const data = await response.json();
 *     console.log(data);
 *   } catch (error) {
 *     console.error('Fetch error:', error);
 *   }
 * ```
 *
 * @example
 * ```typescript
 *   try {
 *     const response = await fetchAPI({
 *       api: '/users',
 *       method: 'POST',
 *       data: { name: 'Jane Doe', age: 30 },
 *       shouldAuth: true
 *     });
 *     if (!response.ok) throw new Error('Failed to post data');
 *     const data = await response.json();
 *     console.log('User created:', data);
 *   } catch (error) {
 *     console.error('Fetch error:', error);
 *   }
 * ```
 */
export async function fetchAPI<T>({
  api,
  method,
  data,
  headers = {},
  shouldAuth = false,
  option = {},
}: FetchOptions<T>): Promise<Response> {
  const finalHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (shouldAuth) {
    const sessionCookie = getSessionCookie();
    if (sessionCookie === null) {
      throw new Error('Authentication required but no session cookie found.');
    }
    finalHeaders.Authorization = `Bearer ${sessionCookie}`;
  }

  const response = await fetch(`${endpoint}${api}`, {
    method,
    headers: finalHeaders,
    body: data ? JSON.stringify(data) : undefined,
    ...option,
  });

  return response;
}
