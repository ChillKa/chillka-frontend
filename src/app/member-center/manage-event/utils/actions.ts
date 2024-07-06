'use server';

import { fetchAPI } from '@action/utils';
import { Order } from './types';

export async function getCreatedActivities() {
  const response = await fetchAPI({
    api: `/auth/activities`,
    method: 'GET',
    shouldAuth: true,
  });

  if (!response.ok) {
    return {
      activities: [],
      total: 0,
    };
  }

  const result = await response.json();

  return {
    activities: result.data,
    total: result.total,
  };
}

interface GetOrderParticipantResult {
  orders: Order[];
  total?: number;
}
export async function getOrderParticipant(
  id: string
): Promise<GetOrderParticipantResult> {
  const response = await fetchAPI({
    api: `/auth/activities/${id}/participants`,
    method: 'GET',
    shouldAuth: true,
  });

  if (!response.ok) {
    return {
      orders: [],
      total: 0,
    };
  }

  const result = await response.json();

  return {
    orders: result.data,
    total: result.total,
  };
}
