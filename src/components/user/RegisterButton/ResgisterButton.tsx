'use client';

import { Button } from '@components/ui/button';
import Link from 'next/link';

const ResgisterButton: React.FC = () => {
  return (
    <Link href="/auth/register">
      <Button variant="ghost" size="sm">
        註冊
      </Button>
    </Link>
  );
};

export default ResgisterButton;
