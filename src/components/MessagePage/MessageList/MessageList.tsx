'use client';

import { H3 } from '@components/ui/typography';
import formatDateTime from '@lib/dateUtils';
import { useAuthContext } from '@store/AuthProvider/AuthProvider';
import Image from 'next/image';
import Link from 'next/link';
import { Message, MessageUserType } from 'src/types/message';

const defaultAvatar = '/header__defaultAvatar.svg';

type MessageListProps = {
  messages: Message[];
};

const MessageList = ({ messages }: MessageListProps) => {
  const { auth } = useAuthContext();

  if (messages.length === 0) {
    return <H3 className="mt-8 text-primary">目前尚未有訊息</H3>;
  }

  return (
    <div className="overflow-y-auto">
      {messages.map((m, index) => {
        let displayName = '';
        const currentUserType =
          auth?._id === m.host._id
            ? MessageUserType.HOST
            : MessageUserType.PARTICIPANT;
        const isCurrentUser = currentUserType === m.messages.userType;
        const isHost = m.messages.userType === MessageUserType.HOST;

        if (isCurrentUser) {
          displayName = '你';
        } else if (isHost) {
          displayName = m.host.displayName;
        } else {
          displayName = m.participant.displayName;
        }

        return (
          <Link key={m._id} href={`message/${m._id}`}>
            <div
              className={`${index === messages.length - 1 ? '' : 'border-b'} py-6`}
            >
              <div className="flex items-center gap-4">
                <Image
                  src={
                    isHost
                      ? m.host?.profilePicture ?? defaultAvatar
                      : m.participant?.profilePicture ?? defaultAvatar
                  }
                  alt="user"
                  width={40}
                  height={40}
                  className="h-10 w-10 overflow-hidden rounded-full object-cover"
                />
                <p className="w-full truncate">
                  {`${displayName}: ${m.messages.content}`}
                </p>
              </div>
              <div className="flex justify-end gap-4 text-sm">
                <p>{formatDateTime(m.updatedAt)}</p>
                {!isCurrentUser && (
                  <p className="text-gray-500">
                    {m.messages.receiverIsRead ? '已讀' : '未讀'}
                  </p>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MessageList;
