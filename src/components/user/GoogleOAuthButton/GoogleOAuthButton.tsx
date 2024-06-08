'use client';

import { googleOAuth } from '@action/auth';
import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';
import Image from 'next/image';
import { useTransition } from 'react';

type GoogleOAuthButtonProps = {
  action: 'login' | 'register';
};
const googleIcon = '/logo__google.png';

const GoogleOAuthButton = ({ action }: GoogleOAuthButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleGoogleOAuth = () => {
    startTransition(async () => {
      await googleOAuth();
    });
  };

  return (
    <div className="text-primary">
      <Separator className="my-4 h-[0.0625rem] w-full" />
      <Button
        variant="outline"
        size="sm"
        className="w-full border-primary transition hover:bg-primary/10"
        onClick={handleGoogleOAuth}
        disabled={isPending}
      >
        <Image
          src={googleIcon}
          width={24}
          height={24}
          loading="eager"
          alt="google"
          className="mr-2"
        />
        使用 Google 帳號{action === 'login' ? '登入' : '註冊'}
      </Button>
    </div>
  );
};

export default GoogleOAuthButton;
