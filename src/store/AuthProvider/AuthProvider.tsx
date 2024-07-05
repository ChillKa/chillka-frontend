'use client';

import {
  login as authLogin,
  logout as authLogout,
  getSession,
} from '@action/auth';
import { fetchMe } from '@action/user';
import { FormState, loginFormSchema } from '@lib/definitions';
import { useRouter } from 'next/navigation';
import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { z } from 'zod';

export interface AuthContextType {
  isLoggedin: boolean;
  login: (formData: z.infer<typeof loginFormSchema>) => Promise<FormState>;
  logout: () => Promise<void>;
  userName: string;
  userAvatar: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuthContext = (): AuthContextType => {
  const contextValue = useContext<AuthContextType | undefined>(AuthContext);
  if (contextValue === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return contextValue;
};

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const router = useRouter();

  const getUser = useCallback(async () => {
    const response = await fetchMe();

    if (response.status === 'success' && response.data) {
      const { data } = response;
      setUserName(data.displayName);
      setUserAvatar(data.profilePicture ?? '');
    }
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();

      setIsLoggedin(!!session);

      if (session) getUser();
    };

    checkSession();
  }, [getUser]);

  const login = useCallback(
    async (formData: z.infer<typeof loginFormSchema>) => {
      const result = await authLogin(formData);
      const session = await getSession();

      setIsLoggedin(!!session);
      // if (session) router.push('/user/about');
      if (session) {
        router.push('/');
        getUser();
      }

      return result;
    },
    [router, getUser]
  );

  const logout = useCallback(async () => {
    await authLogout();
    setIsLoggedin(false);
    setUserName('');
    setUserAvatar('');
  }, []);

  const contextValue = useMemo(
    () => ({
      isLoggedin,
      login,
      logout,
      userName,
      userAvatar,
    }),
    [isLoggedin, login, logout, userName, userAvatar]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
