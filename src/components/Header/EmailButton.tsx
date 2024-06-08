import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Separator } from '@components/ui/separator';
import { Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const fakeAvatar = '/header__fakeAvatar.svg';

const fakeData = [
  {
    avatar: fakeAvatar,
    user: 'Apple',
    content: '您是否有任何繪畫或藝術相關的經驗？',
    time: '2024-03-21',
  },
  {
    avatar: fakeAvatar,
    user: 'Apple',
    content: '您是否有任何繪畫或藝術相關的經驗？ ',
    time: '2024-03-21',
  },
  {
    avatar: fakeAvatar,
    user: 'Apple',
    content: '您是否有任何繪畫或藝術相關的經驗？  ',
    time: '2024-03-21',
  },
  {
    avatar: fakeAvatar,
    user: 'Apple',
    content: '您是否有任何繪畫或藝術相關的經驗？   ',
    time: '2024-03-21',
  },
  {
    avatar: fakeAvatar,
    user: 'Apple',
    content: '您是否有任何繪畫或藝術相關的經驗？',
    time: '2024-03-21',
  },
];

const EmailButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="ml-[0.1875ren] mr-[0.8125rem] rounded-full border border-primary p-5 data-[state=open]:ml-0 data-[state=open]:mr-[0.625rem] data-[state=open]:border-4">
        <Mail size={24} />
      </PopoverTrigger>
      <PopoverContent className="h-0 w-0 border-none bg-transparent p-0 text-primary">
        <div className="absolute right-[-1.875rem] box-content w-[39.75rem] rounded-[2rem] border-4 border-primary bg-surface pt-6 ">
          <h2 className="mb-4 p-2 px-8 text-3xl font-bold tracking-[-0.0140625rem]">
            信箱
          </h2>
          {fakeData.map(
            (message, i) =>
              i < 4 && (
                <div className="mb-4 flex px-8 py-2" key={message.content}>
                  <div className="mr-6">
                    <Image
                      className="mt-7 h-10 w-10"
                      src={message.avatar}
                      alt="avatar"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-xl font-bold">{message.user}</p>
                    <p className="mb-2 h-7 overflow-hidden text-base">
                      {message.content}
                    </p>
                    <p className="text-sm font-medium leading-[0.875rem]">
                      {message.time}
                    </p>
                  </div>
                </div>
              )
          )}
          <Separator className="h-[0.0625rem] bg-primary" />
          <Link
            href="/"
            className="flex h-[4.5rem] w-full items-center justify-center hover:bg-primary/[0.03]"
          >
            查看所有訊息
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EmailButton;
