'use client';

import { Suspense } from 'react';
import ResetPasswordForm from './ResetPasswordForm';

const ResetPasswordFormWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordFormWrapper;
