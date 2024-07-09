import { CommentsDataType } from 'src/types/comments';
import { fetchAPI } from './utils';

export type CommentsResponseState = {
  status: string;
  message?: string;
  data?: CommentsDataType;
};

export async function fetchComments(): Promise<CommentsResponseState> {
  try {
    const response = await fetchAPI({
      api: `/activities/comments`,
      method: 'GET',
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return {
        status: 'failed',
        message: errorMessage,
      };
    }

    const fetchedData = await response.json();
    return {
      status: 'success',
      data: fetchedData,
    };
  } catch (error) {
    return {
      status: 'failed',
      message: `${error}`,
    };
  }
}
