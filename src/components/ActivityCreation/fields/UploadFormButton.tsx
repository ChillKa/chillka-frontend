'use client';

import { Button } from '@components/ui/button';
import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

type UploadFormButtonProps = {
  uploadCount: number;
  children: ReactNode;
};

const UploadFormButton = ({
  uploadCount,
  children = null,
}: UploadFormButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="form"
      className="block"
      type="submit"
      disabled={pending || uploadCount !== 0}
    >
      {children}
    </Button>
  );
};

export default UploadFormButton;
