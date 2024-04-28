'use client';

import { Button } from '@components/ui/button';
import Link from 'next/link';

const UserResgisterButton: React.FC = () => {
  return (
    <Button size="sm">
      <Link href="/auth/register">註冊</Link>
    </Button>
  );
};

export default UserResgisterButton;
