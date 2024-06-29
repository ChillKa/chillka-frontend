'use server';

import { SearchParams } from '@components/SearchBar/fields/utils';
import { userCommentSchema } from '@lib/definitions';
import { createDebounce } from '@lib/utils';
import { z } from 'zod';
import { IAcitivityResponse } from '../types/activity';
import { fetchAPI, getJwtPayload, validateWithSchema } from './utils';

interface ContinuousActivity {
  period: string;
  week: string;
  day: string;
}

// FIXME: Wait for backend fixed with no data
interface Organizer {
  name?: string;
  contactName?: string;
}

// should total page count
export interface Activity {
  _id: string;
  organizer: Organizer;
  thumbnail: string;
  name: string;
  collected: boolean;
  details: string;
  location: string;
  participantAmount: number; // FIXME: unchecked whether has bought or just register
  lat: number;
  lng: number;
  category: string;
  price: number;
  discount: number; // FIXME: deprecated, remove  -1 is free, 0 is none, positive
  startDate: string;
  startDateTime: string;
  fromToday: boolean;
  endDate: string;
  endDateTime: string;
  noEndDate: boolean;
  type: string;
  link: string;
  isContinuous: boolean; // FIXME: deprecated, but remaining this field
  continuous: ContinuousActivity; // FIXME: deprecated, remove
}

export interface SearchResult {
  activities: Activity[];
  total: number;
}

export async function getActivitiesByFilter(
  params: Partial<SearchParams>
): Promise<SearchResult> {
  const queryParams = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    const value = params[key as keyof SearchParams];
    if (value) {
      queryParams.append(key, value);
    }
  });

  const queryString = queryParams.toString();
  const api = queryString
    ? `/activities?${queryString}`
    : '/activities?limit=5';

  const response = await fetchAPI({
    api,
    method: 'GET',
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

export async function getRecommendActivitiesByKeyword(keyword: string) {
  const api = keyword
    ? `/activities?limit=4&keyword=${keyword}`
    : '/activities?limit=4';

  try {
    const [activitiesResponse, keywordsResponse] = await Promise.all([
      fetchAPI({ api, method: 'GET' }),
      fetchAPI({ api: '/activities/popular-keywords', method: 'GET' }),
    ]);

    if (!activitiesResponse.ok || !keywordsResponse.ok) {
      return {
        keyword: [],
        pictures: [],
      };
    }

    const activitiesResult = await activitiesResponse.json();
    const keywordsResult = await keywordsResponse.json();

    return {
      // FIXME: server response maybe change data: { url, keyword }
      keyword: keywordsResult.keywords.map((result: string) => ({
        url: '/',
        keyword: result,
      })),
      pictures: activitiesResult.data.map((activity: Activity) => ({
        thumbnail: activity.thumbnail,
        url: activity.link,
        description: activity.name,
      })),
    };
  } catch (e) {
    return {
      keyword: [],
      pictures: [],
    };
  }
}
export const getRecommendActivitiesByKeywordWithDebounce = createDebounce(
  getRecommendActivitiesByKeyword,
  1500
);

export interface ActivityFetchState {
  result: IAcitivityResponse | null;
  userId: string | null;
}

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
      return {
        result: null,
        userId,
      };
    }

    const result = await response.json();

    return {
      result,
      userId,
    };
  } catch (error) {
    return {
      result: null,
      userId: null,
    };
  }
}

export interface RecommendedActivityFetchState {
  // FIXME: enhance the type
  activities: {
    _id: string;
    thumbnail: string;
    name: string;
    summary: string;
    startDateTime: string;
    fromToday: boolean;
    endDateTime: string;
    noEndDate: boolean;
    location: string;
    participantNumber: number;
    organizerName: string;
    discount: number | undefined; // FIXME: no this field
    collected: boolean | undefined; //  FIXME: no this field
    ticketPrice: {
      name: string;
      price: number;
    }[];
  }[];
}
export async function fetchRecommendedActivity(): Promise<RecommendedActivityFetchState> {
  try {
    const payload = await getJwtPayload();
    const userIdParam =
      payload && typeof payload._id === 'string'
        ? `?userId=${payload._id}`
        : '';

    const response = await fetchAPI({
      api: `/activities/recommend/${userIdParam}`,
      method: 'GET',
    });

    if (!response.ok) {
      return {
        activities: [],
      };
    }

    const activity = await response.json();

    return {
      activities: activity,
    };
  } catch (error) {
    return {
      activities: [],
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
