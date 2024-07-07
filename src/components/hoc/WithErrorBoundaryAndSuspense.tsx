'use client';

import ErrorBoundarySection from '@components/error/ErrorBoundarySection';
import React, { ComponentType, Suspense } from 'react';

type WithErrorBoundaryAndSuspenseProps = {
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

const WithErrorBoundaryAndSuspense = ({
  fallback,
  children,
}: WithErrorBoundaryAndSuspenseProps) => {
  return (
    <ErrorBoundarySection>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundarySection>
  );
};

export const withErrorBoundaryAndSuspense = <P extends object>(
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Component: ComponentType<P>,
  fallback?: React.ReactNode
) => {
  return function errorBoundaryAndSuspense(props: P) {
    return (
      <ErrorBoundarySection>
        <Suspense
          fallback={fallback || <div className="h-fit w-full">Loading...</div>}
        >
          <Component {...props} />
        </Suspense>
      </ErrorBoundarySection>
    );
  };
};

export default WithErrorBoundaryAndSuspense;
