import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Separator } from '@components/ui/separator';
import { H3, H4, P, Small } from '@components/ui/typography';
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

  const handlePopoverClick = (event: React.MouseEvent) => {
    const isLinkClick = (event.target as HTMLElement).closest('a');
    if (isLinkClick) setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="ml-[0.1875ren] mr-[0.8125rem] rounded-full border border-primary p-5 data-[state=open]:ml-0 data-[state=open]:mr-[0.625rem] data-[state=open]:border-4">
        <Mail size={24} />
      </PopoverTrigger>
      <PopoverContent
        onClickCapture={handlePopoverClick}
        className="h-0 w-0 border-none bg-transparent p-0 text-primary"
      >
        <div className="absolute right-[-1.875rem] box-content w-96 rounded-[2rem] border-4 border-primary bg-surface pt-6 ">
          <H3 className="mb-2 p-2 px-8">信箱</H3>
          {fakeData.map(
            (message, i) =>
              i < 4 && (
                <div
                  className={`flex items-center px-8 py-2 ${i !== 3 ? 'mb-2' : 'mb-4'}`}
                  key={message.content}
                >
                  <Image
                    className="mr-4"
                    src={message.avatar}
                    alt="avatar"
                    width={40}
                    height={40}
                  />
                  <div>
                    <H4 className="mb-2">{message.user}</H4>
                    <P className="mb-2 line-clamp-1 h-7">{message.content}</P>
                    <Small>{message.time}</Small>
                  </div>
                </div>
              )
          )}
          <Separator className="h-[0.0625rem] bg-primary" />
          <Link
            href="/member-center/email"
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
