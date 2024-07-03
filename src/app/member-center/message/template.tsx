'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

const MessageTemplate = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [router]);

  return <div>{children}</div>;
};

export default MessageTemplate;
