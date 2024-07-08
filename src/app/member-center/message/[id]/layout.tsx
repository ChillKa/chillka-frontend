'use client';

import { useAuthContext } from '@store/AuthProvider/AuthProvider';
import { SocketProvider } from '@store/SocketProvider/SocketProvider';
import { ReactNode } from 'react';

type MessageDetailLayoutProps = {
  children: ReactNode;
  params: { id: string };
};

const MessageDetailLayout = ({
  children,
  params,
}: MessageDetailLayoutProps) => {
  const messageListId = params.id;
  const { auth } = useAuthContext();
  const _query = { messageListId, userId: auth?._id };

  if (!auth?._id) return null;

  return <SocketProvider query={_query}>{children}</SocketProvider>;
};

export default MessageDetailLayout;
