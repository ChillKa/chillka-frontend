'use server';

import { fetchAPI } from './utils';

export async function getTickets(): Promise<any> {
  try {
    const response = await fetchAPI({
      api: `/auth/orders`,
      method: 'GET',
      shouldAuth: true,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return {
        status: 'failed',
        message: errorMessage,
      };
    }

    const fetchedData = await response.json();
    return fetchedData;
  } catch (error) {
    return {
      status: 'failed',
      message: error,
    };
  }
}
