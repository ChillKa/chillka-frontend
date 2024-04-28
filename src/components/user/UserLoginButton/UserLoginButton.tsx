'use client';

import { Button } from '@components/ui/button';
import Link from 'next/link';

const UserLoginButton: React.FC = () => {
  return (
    <Button variant="ghost" size="sm" asChild>
      <Link href="/auth/login">登入</Link>
    </Button>
  );
};

export default UserLoginButton;
