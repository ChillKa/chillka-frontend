import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Separator } from '@components/ui/separator';
import { H3, P, Small } from '@components/ui/typography';
import { motion, useCycle } from 'framer-motion';
import { Bell, Lightbulb } from 'lucide-react';
import Link from 'next/link';

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

const menuAnimation = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const NotificationButton = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  const handlePopoverClick = (event: React.MouseEvent) => {
    const isLinkClick = (event.target as HTMLElement).closest('a');
    if (isLinkClick) toggleOpen();
  };

  const changeIsOpen = (open: boolean) => {
    if (open !== isOpen) toggleOpen();
  };

  return (
    <Popover open={isOpen} onOpenChange={changeIsOpen}>
      <PopoverTrigger className="ml-[0.1875rem] mr-[0.8125rem] rounded-full border border-primary p-5 data-[state=open]:ml-0 data-[state=open]:mr-[0.625rem] data-[state=open]:border-4">
        <Bell size={24} />
      </PopoverTrigger>
      <PopoverContent
        onClickCapture={handlePopoverClick}
        className="h-0 w-0 border-none bg-transparent p-0 text-primary"
      >
        <div className="absolute right-[-1.875rem] box-content w-96 rounded-[2rem] border-4 border-primary bg-surface pt-6 ">
          <H3 className="mb-2 p-2 px-8">通知</H3>
          <motion.div
            initial="closed"
            animate={isOpen ? 'open' : 'closed'}
            variants={{
              open: {
                transition: { staggerChildren: 0.07, delayChildren: 0.2 },
              },
              closed: {
                transition: { staggerChildren: 0.05, staggerDirection: -1 },
              },
            }}
          >
            {fakeData.map(
              (message, i) =>
                i < 4 && (
                  <motion.div
                    variants={menuAnimation}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={message.content}
                  >
                    <div
                      className={`flex cursor-pointer items-center px-8 py-2 hover:bg-primary/[0.03] ${i !== 3 ? 'mb-2' : 'mb-4'}`}
                      key={message.content}
                    >
                      <div className="mr-4 rounded-full bg-[#403E3D] p-2">
                        <Lightbulb className="text-white" size={24} />
                      </div>
                      <div>
                        <P className="line-clamp-2 max-h-14 font-bold">
                          {message.content}
                        </P>
                        <Small className="mt-2">{message.time}</Small>
                      </div>
                    </div>
                  </motion.div>
                )
            )}
          </motion.div>
          <Separator className="h-[0.0625rem] bg-primary" />
          <Link
            href="/"
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
