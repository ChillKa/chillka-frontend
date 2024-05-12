import { FormState, userFormSchema } from '@lib/definitions';
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

// TODO: use session and jwt id to get the current user
export async function fetchMe(): Promise<UserFetchState> {
  const fetchedData = {
    displayName: 'tester',
  };

  const validatedData = userFormSchema.safeParse(fetchedData);

  if (!validatedData.success) {
    return {
      status: 'failed',
      message: 'Data validation failed',
    };
  }

  try {
    await Promise.resolve('success');

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
