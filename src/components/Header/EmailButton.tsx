import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
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
    content: '您是否有任何繪畫或藝術相關的經驗？',
    time: '2024-03-21',
  },
  {
    avatar: fakeAvatar,
    user: 'Apple',
    content: '您是否有任何繪畫或藝術相關的經驗？',
    time: '2024-03-21',
  },
  {
    avatar: fakeAvatar,
    user: 'Apple',
    content: '您是否有任何繪畫或藝術相關的經驗？',
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
      <PopoverTrigger className="ml-[3px] mr-4 rounded-full border border-primary p-5 data-[state=open]:ml-0 data-[state=open]:mr-[13px] data-[state=open]:border-4">
        <Mail size={24} />
      </PopoverTrigger>

      <PopoverContent className="h-0 w-0 border-none bg-transparent p-0">
        <div className="absolute right-[-30px] top-4 w-[636px] rounded-[32px] border-4 border-black bg-[#e8e4de] pt-6 ">
          <div className="mb-4 flex h-[52px] items-center px-8 text-3xl font-bold">
            信箱
          </div>
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
                    <div className="mb-2 text-xl font-bold">{message.user}</div>
                    <div className="mb-2 h-7 overflow-hidden text-base">
                      {message.content}
                    </div>
                    <div className="h-[14px] text-sm font-semibold leading-[14px]">
                      {message.time}
                    </div>
                  </div>
                </div>
              )
          )}
          <div className="h-[1px] w-full bg-black" />
          <Link
            href="/"
            className="flex h-[72px] w-full items-center justify-center"
          >
            查看所有訊息
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EmailButton;
