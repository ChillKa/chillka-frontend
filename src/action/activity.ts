'use server';

import { SearchParams } from '@components/SearchBar/fields/utils';
import { userCommentSchema } from '@lib/definitions';
import { z } from 'zod';
import { IAcitivityResponse } from '../types/activity';
import { fetchAPI, getJwtPayload, validateWithSchema } from './utils';

interface ContinuousActivity {
  period: string;
  week: string;
  day: string;
}

// should total page count
export interface Activity {
  id: string;
  organizerName: string;
  thumbnail: string;
  name: string;
  collected: boolean;
  description: string;
  location: string; // lat lon
  attendance: number;
  lat: number;
  lng: number;
  category: string; //
  pricing: number;
  discount: number; // -1 is free, 0 is none, positive
  startDate: string;
  startTime: string;
  fromToday: boolean; // ?
  endDate: string;
  endTime: string;
  noEndDate: boolean;
  type: string; // ?
  link: string;
  isContinuous: boolean;
  continuous: ContinuousActivity; // ?
}

export async function getActivitiesByFilter(
  params: Partial<SearchParams>
): Promise<Activity[]> {
  console.log(params);

  await new Promise((resolve) => {
    setTimeout(resolve, 4000);
  });

  return [
    {
      id: '1',
      organizerName: 'Organizer A',
      thumbnail:
        'https://fastly.picsum.photos/id/495/200/200.jpg?hmac=WzrKoNNBWVnlSjTRFVRlUyZghnLUBZJXeXdHNugLsQ4',
      name: 'Activity A',
      collected: false,
      description: 'This is Description',
      location: '台北市 / 信義區',
      attendance: 999,
      lat: 25.033,
      lng: 121.5654,
      category: 'Category 1',
      pricing: 1000,
      discount: 50,
      startDate: '2024-06-15',
      startTime: '10:00',
      fromToday: true,
      endDate: '2024-06-16',
      endTime: '18:00',
      noEndDate: false,
      type: 'Online',
      link: 'https://example.com/activityA',
      isContinuous: true,
      continuous: {
        period: 'Weekly',
        week: '2',
        day: 'Wednesday',
      },
    },
    {
      id: '2',
      organizerName: 'Organizer B',
      thumbnail:
        'https://fastly.picsum.photos/id/495/200/200.jpg?hmac=WzrKoNNBWVnlSjTRFVRlUyZghnLUBZJXeXdHNugLsQ4',
      name: 'Activity B',
      collected: true,
      description: 'This is Description',
      location: '台北市 / 信義區',
      attendance: 999,
      lat: 24.1477,
      lng: 120.6736,
      category: 'Category 2',
      pricing: 1000,
      discount: 0,
      startDate: '2024-07-01',
      startTime: '09:00',
      fromToday: false,
      endDate: '2024-07-02',
      endTime: '17:00',
      noEndDate: false,
      type: 'Offline',
      link: 'https://example.com/activityB',
      isContinuous: true,
      continuous: {
        period: 'Monthly',
        week: '1',
        day: 'Monday',
      },
    },
    {
      id: '3',
      organizerName: 'Organizer B',
      thumbnail:
        'https://fastly.picsum.photos/id/495/200/200.jpg?hmac=WzrKoNNBWVnlSjTRFVRlUyZghnLUBZJXeXdHNugLsQ4',
      name: 'Activity B',
      collected: false,
      description: 'This is Description',
      location: '台北市 / 信義區',
      attendance: 999,
      lat: 24.1497,
      lng: 120.675,
      category: 'Category 2',
      pricing: 1000,
      discount: 0,
      startDate: '2024-07-01',
      startTime: '09:00',
      fromToday: false,
      endDate: '2024-07-02',
      endTime: '17:00',
      noEndDate: false,
      type: 'Offline',
      link: 'https://example.com/activityB',
      isContinuous: false,
      continuous: {
        period: 'Monthly',
        week: '1',
        day: 'Monday',
      },
    },
    {
      id: '4',
      organizerName: 'Organizer B',
      thumbnail:
        'https://fastly.picsum.photos/id/495/200/200.jpg?hmac=WzrKoNNBWVnlSjTRFVRlUyZghnLUBZJXeXdHNugLsQ4',
      name: 'Activity B',
      collected: false,
      description: 'This is Description',
      location: '台北市 / 信義區',
      attendance: 999,
      lat: 24.1485,
      lng: 120.675,
      category: 'Category 2',
      pricing: 1000,
      discount: -1,
      startDate: '2024-07-01',
      startTime: '09:00',
      fromToday: false,
      endDate: '2024-07-02',
      endTime: '17:00',
      noEndDate: false,
      type: 'Offline',
      link: 'https://example.com/activityB',
      isContinuous: false,
      continuous: {
        period: 'Monthly',
        week: '1',
        day: 'Monday',
      },
    },
    {
      id: '5',
      organizerName: 'Organizer B',
      thumbnail:
        'https://fastly.picsum.photos/id/495/200/200.jpg?hmac=WzrKoNNBWVnlSjTRFVRlUyZghnLUBZJXeXdHNugLsQ4',
      name: 'Activity B',
      collected: false,
      description: 'This is Description',
      location: '台北市 / 信義區',
      attendance: 999,
      lat: 24.1425,
      lng: 120.675,
      category: 'Category 2',
      pricing: 1000,
      discount: -1,
      startDate: '2024-07-01',
      startTime: '09:00',
      fromToday: false,
      endDate: '2024-07-02',
      endTime: '17:00',
      noEndDate: false,
      type: 'Offline',
      link: 'https://example.com/activityB',
      isContinuous: false,
      continuous: {
        period: 'Monthly',
        week: '1',
        day: 'Monday',
      },
    },
  ];
}

export type ActivityFetchState =
  | {
      status: 'success';
      data: IAcitivityResponse;
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

    const result = await response.json();

    return {
      status: 'success',
      data: result,
      userId,
    };
  } catch (error) {
    return {
      status: 'failed',
      message: `Error fetching user data: ${error}`,
    };
  }
}

export type ActivityState =
  | {
      status: 'success';
      message: string;
    }
  | {
      status: 'failed';
      message: string;
    };

export async function toggleFavoriteActivity(
  activityId: string
): Promise<ActivityState> {
  try {
    const response = await fetchAPI({
      api: `/auth/saved-activities/${activityId}`,
      method: 'POST',
      shouldAuth: true,
    });

    if (!response.ok) {
      const errorMessage = await response.text();

      return {
        status: 'failed',
        message: `${errorMessage ?? '更新活動收藏狀態失敗，請稍後重新再試。'} (${response.status})`,
      };
    }

    return {
      status: 'success',
      message: '成功更新此活動收藏狀態！',
    };
  } catch (error) {
    return {
      status: 'failed',
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

export type FavoriteActivityState =
  | {
      status: 'success';
      message: string;
    }
  | {
      status: 'failed';
      message: string;
    };

export async function createQuestion(
  type: string,
  activityId: string,
  content: z.infer<typeof userCommentSchema>,
  questionId?: string
): Promise<ActivityState> {
  try {
    const validatedData = validateWithSchema(userCommentSchema, content);

    let requestData: { type: string; content: string; questionId?: string } = {
      type,
      ...validatedData,
    };

    if (questionId) {
      requestData = {
        ...requestData,
        questionId,
      };
    }

    const response = await fetchAPI({
      api: `/auth/activities/${activityId}/questions`,
      method: 'POST',
      shouldAuth: true,
      data: requestData,
    });

    if (!response.ok) {
      const errorMessage = await response.text();

      return {
        status: 'failed',
        message: `${errorMessage ?? '留言失敗，請稍後重新再試。'} (${response.status})`,
      };
    }

    return {
      status: 'success',
      message: '留言成功！',
    };
  } catch (error) {
    return {
      status: 'failed',
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

export async function deleteQuestion(
  activityId: string,
  questionId: string
): Promise<ActivityState> {
  try {
    const response = await fetchAPI({
      api: `/auth/activities/${activityId}/questions`,
      method: 'DELETE',
      shouldAuth: true,
      data: { questionId },
    });

    if (!response.ok) {
      const errorMessage = await response.text();

      return {
        status: 'failed',
        message: `${errorMessage ?? '刪除失敗，請稍後重新再試。'} (${response.status})`,
      };
    }

    return {
      status: 'success',
      message: '刪除留言成功！',
    };
  } catch (error) {
    return {
      status: 'failed',
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}
