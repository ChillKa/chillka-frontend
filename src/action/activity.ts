'use server';

import { SearchParams } from '@components/SearchBar/fields/utils';
import { acitivityResponseSchema, userCommentSchema } from '@lib/definitions';
import { z } from 'zod';
import { fetchAPI, getJwtPayload, validateWithSchema } from './utils';

interface ContinuousActivity {
  period: string;
  week: string;
  day: string;
}

export interface Activity {
  id: string;
  organizerName: string;
  thumbnail: string;
  name: string;
  category: string;
  startDate: string;
  startTime: string;
  fromToday: boolean;
  endDate: string;
  endTime: string;
  noEndDate: boolean;
  type: string;
  link: string;
  isContinuous: string;
  continuous: ContinuousActivity;
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
      thumbnail: 'https://example.com/thumbnail1.jpg',
      name: 'Activity A',
      category: 'Category 1',
      startDate: '2024-06-15',
      startTime: '10:00',
      fromToday: true,
      endDate: '2024-06-16',
      endTime: '18:00',
      noEndDate: false,
      type: 'Online',
      link: 'https://example.com/activityA',
      isContinuous: 'Yes',
      continuous: {
        period: 'Weekly',
        week: '2',
        day: 'Wednesday',
      },
    },
    {
      id: '2',
      organizerName: 'Organizer B',
      thumbnail: 'https://example.com/thumbnail2.jpg',
      name: 'Activity B',
      category: 'Category 2',
      startDate: '2024-07-01',
      startTime: '09:00',
      fromToday: false,
      endDate: '2024-07-02',
      endTime: '17:00',
      noEndDate: false,
      type: 'Offline',
      link: 'https://example.com/activityB',
      isContinuous: 'No',
      continuous: {
        period: 'Monthly',
        week: '1',
        day: 'Monday',
      },
    },
  ];
}

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
