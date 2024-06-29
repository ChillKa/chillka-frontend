'use client';

import { H3 } from '@components/ui/typography';
import Image from 'next/image';
import Link from 'next/link';
import { Message, MessageUserType } from 'src/types/message';

const defaultAvatar = '/header__defaultAvatar.svg';

type MessageListProps = {
  messages: Message[];
};

const MessageList = ({ messages }: MessageListProps) => {
  if (messages.length === 0) {
    return <H3 className="mt-8 text-primary">目前尚未有訊息</H3>;
  }

  return (
    <div className="overflow-y-auto">
      {messages.map((m, index) => (
        <Link key={m._id} href={`message/${m._id}`}>
          <div
            className={`${index === messages.length - 1 ? '' : 'border-b'} py-6`}
          >
            <div className="flex items-center gap-4">
              <Image src={defaultAvatar} alt="user" width={40} height={40} />
              <p className="truncate">{m.messages.content}</p>
            </div>
            <div className="flex justify-end gap-4">
              <p>{m.updatedAt}</p>
              {m.messages.userType === MessageUserType.HOST && (
                <p>{m.messages.receiverIsRead}</p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MessageList;
