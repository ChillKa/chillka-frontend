'use server';

import { FormState, endpoint, userFormSchema } from '@lib/definitions';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { z } from 'zod';

export type UserData = z.infer<typeof userFormSchema>;

export async function updateUser(data: UserData): Promise<FormState> {
  const validatedFields = userFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      status: 'failed',
      message: 'Fields format is wrong',
    };
  }

  const { displayName } = validatedFields.data;

  try {
    await Promise.resolve('success');
    return {
      status: 'success',
      message: `User ${displayName} is updated successful.`,
    };
  } catch (error) {
    return {
      status: 'failed',
      message: `Failed to update user due to error: ${error}`,
    };
  }
}

export type UserFetchState =
  | {
      status: 'success';
      data: UserData;
    }
  | {
      status: 'failed';
      message: string;
    };

export async function fetchMe(): Promise<UserFetchState> {
  const sessionCookie = cookies().get('session')?.value;

  if (!sessionCookie) {
    return {
      status: 'failed',
      message: 'No session cookie found',
    };
  }

  try {
    const { payload } = await jwtVerify(
      sessionCookie,
      new TextEncoder().encode('secret')
    );
    if (typeof payload.id !== 'string') {
      throw new Error('No payload id');
    }
    const userId = payload.id;

    const response = await fetch(`${endpoint}/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionCookie}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return {
        status: 'failed',
        message: `${errorMessage ?? 'Fetch user data failed'} (${response.status})`,
      };
    }

    const fetchedData = await response.json();

    const validatedData = userFormSchema.safeParse(fetchedData);

    if (!validatedData.success) {
      return {
        status: 'failed',
        message: 'Data validation failed',
      };
    }

    return {
      status: 'success',
      data: validatedData.data,
    };
  } catch (error) {
    return {
      status: 'failed',
      message: `Error fetching user data: ${error}`,
    };
  }
}
