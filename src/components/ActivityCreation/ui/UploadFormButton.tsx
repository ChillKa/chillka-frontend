'use client';

import { Button } from '@components/ui/button';
import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

export type UploadFormButtonProps = {
  children: ReactNode;
};

const UploadFormButton = ({ children = null }: UploadFormButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button variant="form" className="block" type="submit" disabled={pending}>
      {children}
    </Button>
  );
};

export default UploadFormButton;
