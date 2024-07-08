'use server';

import { MessageListResult } from 'src/types/message';
import { fetchAPI } from './utils';

const MESSAGE_BASE_URL = '/auth/messages';

type ResponseState<T> =
  | {
      status: 'success';
      result: T;
    }
  | {
      status: 'failed';
      result: string;
    };

export async function getMessageListByFilter(
  page?: number,
  limit?: number
): Promise<ResponseState<MessageListResult>> {
  const searchParams = new URLSearchParams();
  if (limit) searchParams.append('limit', limit.toString());
  if (page) searchParams.append('page', page.toString());
  try {
    const response = await fetchAPI({
      api: `${MESSAGE_BASE_URL}?${searchParams.toString()}`,
      method: 'GET',
      shouldAuth: true,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return {
        status: 'failed',
        result: errorMessage,
      };
    }

    const result = await response.json();
    return {
      status: 'success',
      result,
    };
  } catch (error) {
    return {
      status: 'failed',
      result:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}
