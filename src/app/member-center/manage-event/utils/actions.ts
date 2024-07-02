'use server';

import { fetchAPI } from '@action/utils';

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
