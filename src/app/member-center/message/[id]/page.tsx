'use client';

import { Separator } from '@components/ui/separator';
import { H3 } from '@components/ui/typography';
import { ExternalLinkIcon, LoaderCircleIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Reply from '@components/MessagePage/Reply';
import { useEffect, useState } from 'react';
import { useSocket } from '@store/SocketProvider/SocketProvider';
import { MessageHistory, MessageUserType } from 'src/types/message';
import formatDateTime from '@lib/dateUtils';
import { useAuthContext } from '@store/AuthProvider/AuthProvider';
import cn from '@lib/utils';

const defaultAvatar = '/header__defaultAvatar.svg';

const MessageDetailPage = () => {
  const socket = useSocket();
  const { auth } = useAuthContext();
  const [messageHistory, setMessageHistory] = useState<
    MessageHistory | undefined
  >();
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const currentUserType =
    auth?._id === messageHistory?.host._id
      ? MessageUserType.HOST
      : MessageUserType.PARTICIPANT;

  const replyHandler = (content: string) => {
    const userType = currentUserType;
    socket.emit('message', { userType, content });
  };

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (!messageHistory) {
      timeoutId = setTimeout(() => {
        setShowErrorMessage(true);
      }, 10000);
    }

    socket.on('history', (response) => {
      setMessageHistory(response);
    });

    return () => {
      clearTimeout(timeoutId);
    };
  }, [socket, messageHistory]);

  return (
    <div className="flex h-[calc(100vh-var(--header-height))] flex-col gap-6 border p-4">
      <div className="flex items-center gap-4">
        <H3>{messageHistory?.activity.name}</H3>
        <Link href={`/activity/${messageHistory?.activity._id}`}>
          <ExternalLinkIcon />
        </Link>
      </div>
      <Separator />
      <div className="flex grow flex-col-reverse gap-10 overflow-y-auto">
        {!messageHistory ? (
          <div className="flex h-full items-center justify-center">
            {showErrorMessage ? (
              <p>不能取得訊息，請之後再重試。</p>
            ) : (
              <LoaderCircleIcon className="h-10 w-10 animate-spin text-primary" />
            )}
          </div>
        ) : (
          messageHistory?.messages.toReversed().map((m) => {
            let displayName = '';
            const isHost = m.userType === MessageUserType.HOST;
            const isCurrentUser = m.userType === currentUserType;

            if (isCurrentUser) {
              displayName = '你';
            } else if (isHost) {
              displayName = messageHistory.host.displayName;
            } else {
              displayName = messageHistory.participant.displayName;
            }

            return (
              <div key={m._id} className="mx-4 flex flex-col gap-2">
                <div
                  className={cn(
                    `rounded-t-xl bg-slate-50 p-4 ${isCurrentUser ? 'rounded-bl-xl' : 'rounded-br-xl'}`
                  )}
                >
                  {m.content}
                </div>
                <div
                  className={cn(
                    `flex justify-between ${isCurrentUser ? 'flex-row-reverse' : ''}`
                  )}
                >
                  <div
                    className={cn(
                      `flex items-center gap-4 ${isCurrentUser ? 'flex-row-reverse' : ''}`
                    )}
                  >
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
                    <p className="text-sm">{displayName}</p>
                  </div>
                  <p className="self-end text-sm">
                    {formatDateTime(m.createdAt)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      <Reply replyHandler={replyHandler} />
    </div>
  );
};

export default MessageDetailPage;
