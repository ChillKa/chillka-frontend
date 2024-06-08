import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Separator } from '@components/ui/separator';
import useCloseOnClick from '@hooks/use-close-on-click';
import { Bell, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const fakeData = [
  {
    content:
      '您舉辦的「明日音樂節｜星光之夜」活動收到了新的提問，請查看並及時回覆。',
    time: '2024-03-21',
  },
  {
    content:
      '您舉辦的「明日音樂節｜星光之夜」活動收到了新的提問，請查看並及時回覆。 ',
    time: '2024-03-21',
  },
  {
    content:
      '您舉辦的「明日音樂節｜星光之夜」活動收到了新的提問，請查看並及時回覆。  ',
    time: '2024-03-21',
  },
  {
    content:
      '您舉辦的「明日音樂節｜星光之夜」活動收到了新的提問，請查看並及時回覆。   ',
    time: '2024-03-21',
  },
  {
    content:
      '您舉辦的「明日音樂節｜星光之夜」活動收到了新的提問，請查看並及時回覆。    ',
    time: '2024-03-21',
  },
];

const NotificationButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useCloseOnClick(isOpen, setIsOpen);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="ml-[0.1875rem] mr-[0.8125rem] rounded-full border border-primary p-5 data-[state=open]:ml-0 data-[state=open]:mr-[0.625rem] data-[state=open]:border-4">
        <Bell size={24} />
      </PopoverTrigger>
      <PopoverContent className="h-0 w-0 border-none bg-transparent p-0 text-primary">
        <div className="absolute right-[-1.875rem] box-content w-[39.75rem] rounded-[2rem] border-4 border-primary bg-surface pt-6 ">
          <h2 className="mb-4 px-8 text-3xl font-bold tracking-[-0.0140625rem]">
            通知
          </h2>
          {fakeData.map(
            (message, i) =>
              i < 4 && (
                <div
                  className="mb-4 flex items-center justify-center px-8 py-2"
                  key={message.content}
                >
                  <div className="mr-6 rounded-full bg-[#403E3D] p-2">
                    <Lightbulb className="text-white" size={24} />
                  </div>
                  <p className="max-h-14 flex-1 overflow-hidden text-xl font-bold">
                    {message.content}
                  </p>
                  <p className="ml-6 w-[5rem] text-right text-sm font-medium leading-[0.875rem]">
                    {message.time}
                  </p>
                </div>
              )
          )}
          <Separator className="h-[0.0625rem] bg-primary" />
          <Link
            href="/"
            ref={triggerRef as React.RefObject<HTMLAnchorElement>}
            className="flex h-[4.5rem] w-full items-center justify-center hover:bg-primary/[0.03]"
          >
            查看所有通知
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationButton;
