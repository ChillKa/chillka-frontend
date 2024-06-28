'use client';

import { ErrorInfo, PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

type ErrorCardProps = {
  error: Error;
  resetErrorBoundary: () => void;
};
const ErrorCard = ({ error, resetErrorBoundary }: ErrorCardProps) => {
  return (
    <div className="my-4 flex max-h-screen w-full flex-col items-center justify-center gap-4 bg-surface p-4 text-primary">
      <h1 className="text-2xl font-bold">Oops! 似乎出錯了.</h1>
      <p>對此造成的不便，我們表示歉意。請稍後再試。</p>
      <details className="w-full max-w-xl whitespace-pre-wrap rounded-md bg-red-200 p-4">
        <summary className="cursor-pointer">點擊看錯誤資訊</summary>
        {error?.toString()}
      </details>
      <button
        type="button"
        onClick={resetErrorBoundary}
        className="rounded bg-primary px-4 py-2 font-bold text-white hover:bg-primary/90"
      >
        重試
      </button>
    </div>
  );
};

const ErrorBoudarySection = ({ children }: PropsWithChildren) => {
  const logError = async (error: Error, info: ErrorInfo) => {
    const errorData = {
      error: error.toString(),
      errorInfo: info.componentStack,
    };

    try {
      const response = await fetch('/api/log-error', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorData),
      });

      if (!response.ok) {
        throw new Error('Failed to log error');
      }

      const data = await response.json();
      console.log(data.message); // FIXME: Remove when implement the log error api
    } catch (err) {
      console.error('Failed to log error to server:', err); // FIXME: Remove when implement the log error api
    }
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorCard} onError={logError}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoudarySection;
