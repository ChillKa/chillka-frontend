'use client';

import { useAuthContext } from '@store/AuthProvider/AuthProvider';
import { createContext, useContext, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

const SocketContext = createContext<Socket | null>(null);

export interface SocketProviderProps {
  children: React.ReactNode;
  query: Record<string, any>;
}

export const SocketProvider = ({ children, query }: SocketProviderProps) => {
  const isBrowser = typeof window !== 'undefined';
  const [instance, setInstance] = useState<Socket | null>(null);
  const { token } = useAuthContext();

  useEffect(() => {
    if (!isBrowser) return;
    const socket = io(process.env.NEXT_PUBLIC_BASE_URL!, {
      query,
      path: '/socket.io',
      withCredentials: true,
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    setInstance(socket);

    return () => {
      socket.disconnect();
    };
  }, [isBrowser, query]);

  if (!instance) {
    return null;
  }

  return (
    <SocketContext.Provider value={instance}>{children}</SocketContext.Provider>
  );
};

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }

  return context;
}
