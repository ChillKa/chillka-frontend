'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Separator } from '@components/ui/separator';
import { H3, H4, P, Small } from '@components/ui/typography';
import { motion, useCycle } from 'framer-motion';
import { Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getMessageListByFilter } from '@action/message';
import { useEffect, useState } from 'react';
import { Message } from 'src/types/message';
import formatDateTime from '@lib/dateUtils';
import { useAuthContext } from '@store/AuthProvider/AuthProvider';
import { menuAnimation } from './utils';

const defaultAvatar = '/header__defaultAvatar.svg';

const EmailButton = () => {
  const { auth } = useAuthContext();
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [messageList, setMessageList] = useState<Message[]>([]);

  const handlePopoverClick = (event: React.MouseEvent) => {
    const isLinkClick = (event.target as HTMLElement).closest('a');
    if (isLinkClick) toggleOpen();
  };

  const changeIsOpen = (open: boolean) => {
    if (open !== isOpen) toggleOpen();
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMessageListByFilter();
      if (data.status === 'success') {
        setMessageList(data.result.data);
      }
    };
    fetchData();
  }, []);

  return (
    <Popover open={isOpen} onOpenChange={changeIsOpen}>
      <PopoverTrigger className="ml-[0.1875ren] mr-[0.8125rem] rounded-full border border-primary p-5 data-[state=open]:ml-0 data-[state=open]:mr-[0.625rem] data-[state=open]:border-4">
        <Mail size={24} />
      </PopoverTrigger>
      <PopoverContent
        onClickCapture={handlePopoverClick}
        className="h-0 w-0 border-none bg-transparent p-0 text-primary"
      >
        <div className="absolute right-[-1.875rem] box-content w-96 rounded-[2rem] border-4 border-primary bg-surface pt-6 ">
          <H3 className="mb-2 p-2 px-8">訊息</H3>
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
            {messageList.map((list, i) => {
              const isCurrentUserHost = auth?._id === list.host._id;

              return (
                i < 4 && (
                  <motion.div
                    variants={menuAnimation}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={list._id}
                  >
                    <Link
                      href={`/member-center/message/${list._id}`}
                      className={`flex cursor-pointer items-center px-8 py-2 hover:bg-primary/[0.03]  ${i !== 3 ? 'mb-2' : 'mb-4'}`}
                      key={list._id}
                    >
                      <Image
                        className="mr-4 h-10 w-10 overflow-hidden rounded-full object-cover"
                        src={
                          isCurrentUserHost
                            ? list.participant.profilePicture ?? defaultAvatar
                            : list.host.profilePicture ?? defaultAvatar
                        }
                        alt="user"
                        width={40}
                        height={40}
                      />
                      <div>
                        <H4 className="mb-2">
                          {isCurrentUserHost
                            ? list.participant.displayName
                            : list.host.displayName}
                        </H4>
                        <P className="mb-2 line-clamp-1 h-7">
                          {list.messages.content}
                        </P>
                        <Small>{formatDateTime(list.messages.updatedAt)}</Small>
                      </div>
                    </Link>
                  </motion.div>
                )
              );
            })}
          </motion.div>
          <Separator className="h-[0.0625rem] bg-primary" />
          <Link
            href="/member-center/message"
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
