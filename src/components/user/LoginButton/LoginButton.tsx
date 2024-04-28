'use client';

import { Button } from '@components/ui/button';
import Link from 'next/link';

const LoginButton: React.FC = () => {
  return (
    <Link href="/auth/login">
      <Button variant="ghost" size="sm">
        登入
      </Button>
    </Link>
  );
};

export default LoginButton;
