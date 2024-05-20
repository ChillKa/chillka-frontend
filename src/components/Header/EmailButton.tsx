import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import email from '@public/header__email.svg';
import fakeAvatar from '@public/header__fakeAvatar.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const fakeData = [
  {
    avatar: fakeAvatar,
    user: 'Apple',
    content:
      '您舉辦的「明日音樂節｜星光之夜」活動收到了新的提問，請查看並及時回覆。',
    time: '2024-03-21',
  },
  {
    avatar: fakeAvatar,
    user: 'Apple',
    content:
      '您舉辦的「明日音樂節｜星光之夜」活動收到了新的提問，請查看並及時回覆。',
    time: '2024-03-21',
  },
  {
    avatar: fakeAvatar,
    user: 'Apple',
    content:
      '您舉辦的「明日音樂節｜星光之夜」活動收到了新的提問，請查看並及時回覆。',
    time: '2024-03-21',
  },
  {
    avatar: fakeAvatar,
    user: 'Apple',
    content:
      '您舉辦的「明日音樂節｜星光之夜」活動收到了新的提問，請查看並及時回覆。',
    time: '2024-03-21',
  },
  {
    avatar: fakeAvatar,
    user: 'Apple',
    content:
      '您舉辦的「明日音樂節｜星光之夜」活動收到了新的提問，請查看並及時回覆。',
    time: '2024-03-21',
  },
];

const EmailButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="flex">
        <div className="mr-4 flex h-16 w-16 items-center justify-center rounded-full border border-black">
          <div className="flex h-10 w-10 items-center justify-center">
            <Image src={email} alt="email" />
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent className="h-0 w-0 border-none bg-transparent p-0">
        <div className="absolute right-[-30px] top-4  w-[636px]  rounded-[32px] border border-black bg-[#e8e4de] pt-6 ">
          <div className="mb-4 flex h-[52px] items-center px-8 text-3xl font-bold">
            信箱
          </div>
          {fakeData.map(
            (message, i) =>
              i < 4 && (
                <div className="mb-4 flex  px-8 py-2" key={message.content}>
                  <div className="mr-6">
                    <Image
                      className="mt-7 h-10 w-10"
                      src={message.avatar}
                      alt="avatar"
                    />
                  </div>
                  <div>
                    <div className="mb-2 text-xl font-bold">{message.user}</div>
                    <div className="mb-2 max-h-12 overflow-hidden text-base">
                      {message.content}
                    </div>
                    <div className="text-sm font-semibold">{message.time}</div>
                  </div>
                </div>
              )
          )}
          <div className="h-[1px] w-full bg-black" />
          <Link
            href="/"
            className="flex h-[72px] w-full  items-center justify-center"
          >
            查看所有訊息
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EmailButton;
