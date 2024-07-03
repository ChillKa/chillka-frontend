'use server';

import { FormState, userFormSchema } from '@lib/definitions';
import { UserData } from 'src/types/user';
import { fetchAPI, getJwtPayload, validateWithSchema } from './utils';

export async function updateUser(data: UserData): Promise<FormState> {
  try {
    const validatedData = validateWithSchema(userFormSchema, data);
    const { displayName } = validatedData;

    const payload = await getJwtPayload();

    if (typeof payload?._id !== 'string') {
      throw new Error('No payload _id');
    }

    const userId = payload._id;

    const response = await fetchAPI({
      api: `/auth/user/${userId}`,
      method: 'PATCH',
      data: validatedData,
      shouldAuth: true,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return {
        status: 'failed',
        message: `${errorMessage ?? 'Update user failed'} (${response.status})`,
      };
    }

    return {
      status: 'success',
      message: `User ${displayName} is updated successfully.`,
    };
  } catch (error) {
    return {
      status: 'failed',
      message: `Failed to update user due to error: ${error instanceof Error ? error.message : String(error)}`,
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
  try {
    const payload = await getJwtPayload();
    if (typeof payload?._id !== 'string') {
      throw new Error('No payload id');
    }
    const userId = payload._id;

    const response = await fetchAPI({
      api: `/auth/user/${userId}`,
      method: 'GET',
      shouldAuth: true,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return {
        status: 'failed',
        message: `${errorMessage ?? 'Fetch user data failed'} (${response.status})`,
      };
    }

    const fetchedData = await response.json();

    return {
      status: 'success',
      data: fetchedData,
    };
  } catch (error) {
    return {
      status: 'failed',
      message: `Error fetching user data: ${error}`,
    };
  }
}
