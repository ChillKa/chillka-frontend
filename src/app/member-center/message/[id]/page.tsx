'use client';

import { Separator } from '@components/ui/separator';
import { H3 } from '@components/ui/typography';
import { ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Reply from '@components/MessagePage/Reply';
import { useEffect, useRef, useState } from 'react';
import { Socket, io } from 'socket.io-client';

const defaultAvatar = '/header__defaultAvatar.svg';

const MessageDetailPage = ({ params }: { params: { id: string } }) => {
  const [messageHistory, setMessageHistory] = useState([]);
  const socketRef = useRef<Socket | null>(null);

  const messageListId = params.id;

  useEffect(() => {
    socketRef.current = io(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
      query: {
        messageListId,
      },
      transports: ['websocket'],
      path: '/socket.io',
    });

    socketRef.current.on('history', (messages) => {
      console.log('history', messages);
      setMessageHistory(messages);
    });

    // socketRef.current.on('chat message', () => {
    //   console.log('message');
    // });

    return () => {
      console.log('disconnect');
      // socketRef.current?.disconnect();
    };
  }, [params.id]);

  console.log('message history list', messageHistory);

  return (
    <div className="flex h-[calc(100vh-var(--header-height))] flex-col gap-6 border p-4">
      <div className="flex items-center gap-4">
        <H3>Activity name</H3>
        <Link href="/activity/123">
          <ExternalLinkIcon />
        </Link>
      </div>
      <Separator />
      <div className="overflow-y-auto">
        {/* TODO */}
        {Array.from({ length: 10 }).map(() => (
          <div key={new Date().getTime()} className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Image src={defaultAvatar} alt="user" width={40} height={40} />
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been Lorem Ipsum is simply dummy text
                of the printing and typesetting industry. Lorem Ipsum has been
              </p>
            </div>
            <div className="flex justify-end">time: 12:00</div>
          </div>
        ))}
      </div>

      <Reply />
    </div>
  );
};

export default MessageDetailPage;
