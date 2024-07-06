'use server';

import { fetchAPI } from '@action/utils';
import { IActivity } from 'src/types/activity';

interface favoriteActivitiesResult {
  activities: IActivity[];
  total?: number;
}

export async function getFavoriteActivities(): Promise<favoriteActivitiesResult> {
  const response = await fetchAPI({
    api: `/auth/saved-activities`,
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
