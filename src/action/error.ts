'use server';

import { ErrorInfo } from 'react';

export type ErrorLogState =
  | {
      status: 'success';
      message: string;
    }
  | {
      status: 'failed';
      message: string;
    };
export async function errorLog(
  error: Error,
  info: ErrorInfo
): Promise<ErrorLogState> {
  try {
    console.log(error, info);

    return {
      status: 'success',
      message: '成功傳遞錯誤訊息',
    };
  } catch (e) {
    return {
      status: 'failed',
      message: e instanceof Error ? e.message : 'An unknown error occurred',
    };
  }
}
