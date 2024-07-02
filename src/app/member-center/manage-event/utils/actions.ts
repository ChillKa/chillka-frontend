'use server';

import { fetchAPI } from '@action/utils';
import { Participant } from './types';

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

interface GetParticipantResult {
  participants: Participant[];
  total?: number;
}
export async function getParticipant(
  id: string
): Promise<GetParticipantResult> {
  const response = await fetchAPI({
    api: `/auth/activities/${id}/participants`,
    method: 'GET',
    shouldAuth: true,
  });

  if (!response.ok) {
    return {
      participants: [],
      total: 0,
    };
  }

  const result = await response.json();

  return {
    participants: result.data,
    total: result.total,
  };
}
