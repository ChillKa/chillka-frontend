'use client';

import ErrorBoundarySection from '@components/error/ErrorBoundarySection';
import React, { Suspense } from 'react';

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
      <Suspense
        fallback={fallback || <div className="h-fit w-full">Loading...</div>}
      >
        {children}
      </Suspense>
    </ErrorBoundarySection>
  );
};

export default WithErrorBoundaryAndSuspense;
