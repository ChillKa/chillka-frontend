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
  const _query = { messageListId };

  return <SocketProvider query={_query}> {children} </SocketProvider>;
};

export default MessageDetailLayout;
