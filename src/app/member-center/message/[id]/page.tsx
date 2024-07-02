'use client';

import { Separator } from '@components/ui/separator';
import { H3 } from '@components/ui/typography';
import { ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Reply from '@components/MessagePage/Reply';
import { useEffect, useState } from 'react';
import { useSocket } from '@store/SocketProvider/SocketProvider';
import { MessageHistory, MessageUserType } from 'src/types/message';
import formatDateTime from '@lib/dateUtils';

const defaultAvatar = '/header__defaultAvatar.svg';

const MessageDetailPage = () => {
  const socket = useSocket();
  const [messageHistory, setMessageHistory] = useState<
    MessageHistory | undefined
  >();

  const replyHandler = (content: string) => {
    const userType = MessageUserType.PARTICIPANT;
    socket.emit('message', { userType, content });
  };

  useEffect(() => {
    socket.on('history', (response) => {
      setMessageHistory(response);
    });

    return () => {};
  }, [socket]);

  return (
    <div className="flex h-[calc(100vh-var(--header-height))] flex-col gap-6 border p-4">
      <div className="flex items-center gap-4">
        <H3>{messageHistory?.activity.name}</H3>
        <Link href={`/activity/${messageHistory?.activity._id}`}>
          <ExternalLinkIcon />
        </Link>
      </div>
      <Separator />
      <div className="overflow-y-auto">
        {messageHistory?.messages.map((m) => {
          const isHost = m.userType === MessageUserType.HOST;

          return (
            <div key={m._id} className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Image
                  src={
                    isHost
                      ? messageHistory.host?.profilePicture ?? defaultAvatar
                      : messageHistory.participant?.profilePicture ??
                        defaultAvatar
                  }
                  alt="user"
                  width={40}
                  height={40}
                  className="h-10 w-10 overflow-hidden rounded-full object-cover"
                />
                <p>{m.content}</p>
              </div>
              <div className="flex justify-end">
                {formatDateTime(m.createdAt)}
              </div>
            </div>
          );
        })}
      </div>

      <Reply replyHandler={replyHandler} />
    </div>
  );
};

export default MessageDetailPage;
