'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { useState } from 'react';

interface UserProfileButtonProps {
  onSignOut?: () => void;
}

const UserProfileButton: React.FC<UserProfileButtonProps> = ({ onSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col items-center gap-2">
        <Button
          variant="ghost"
          className="flex w-full justify-start gap-2 text-left font-bold"
          onClick={() => {
            onSignOut?.();
          }}
        >
          登出
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfileButton;
