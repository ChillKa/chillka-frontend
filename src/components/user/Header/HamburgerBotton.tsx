'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import cross from '@public/header__cross.svg';
import hamburger from '@public/header__hamburger.svg';
import Image from 'next/image';
import { useState } from 'react';

const HamburgerBotton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex h-16 w-[112px] flex-col items-center justify-center rounded-full border border-black">
        <PopoverTrigger className="flex ">
          <div className="flex h-10 w-10 items-center justify-center">
            {isOpen ? (
              <Image src={cross} alt="cross" />
            ) : (
              <Image src={hamburger} alt="hamburger" />
            )}
          </div>
          <Avatar className="ml-2">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
      </div>

      <PopoverContent className="h-0 w-0 border-none bg-transparent p-0">
        <div className="absolute right-[-56px] top-4 w-[272px] rounded-[32px] border border-black  bg-[#e8e4de]  pt-6">
          <Button
            variant="ghost"
            className="flex w-full justify-start gap-2 text-left font-bold"
            onClick={() => {
              // onSignOut?.();
            }}
          >
            登出
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default HamburgerBotton;
