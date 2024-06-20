'use server';

import { acitivityResponseSchema } from '@lib/definitions';
import { z } from 'zod';
import { fetchAPI, getJwtPayload } from './utils';

export type ActivityData = z.infer<typeof acitivityResponseSchema>;

export type ActivityFetchState =
  | {
      status: 'success';
      data: ActivityData;
      userId: string;
    }
  | {
      status: 'failed';
      message: string;
    };

export async function fetchActivity(data: string): Promise<ActivityFetchState> {
  try {
    const payload = await getJwtPayload();
    let userId = '';
    let userIdParam = '';

    if (payload && typeof payload._id === 'string') {
      userId = payload._id;
      userIdParam = `?userId=${payload._id}`;
    }

    const response = await fetchAPI({
      api: `/activities/${data}${userIdParam}`,
      method: 'GET',
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return {
        status: 'failed',
        message: `${errorMessage ?? 'Fetch activity data failed'} (${response.status})`,
      };
    }

    const fetchedData = await response.json();

    const validatedData = acitivityResponseSchema.safeParse(fetchedData);

    if (!validatedData.success) {
      return {
        status: 'failed',
        message: 'Data validation failed',
      };
    }

    return {
      status: 'success',
      data: validatedData.data,
      userId,
    };
  } catch (error) {
    return {
      status: 'failed',
      message: `Error fetching user data: ${error}`,
    };
  }
}
