'use client';

import {
  login as authLogin,
  logout as authLogout,
  getSession,
} from '@action/auth';
import { fetchMe } from '@action/user';
import { FormState, loginFormSchema } from '@lib/definitions';
import { set } from 'date-fns';
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
import { UserData } from 'src/types/user';
import { z } from 'zod';

export interface AuthContextType {
  isLoggedin: boolean;
  login: (formData: z.infer<typeof loginFormSchema>) => Promise<FormState>;
  logout: () => Promise<void>;
  getUser: () => Promise<void>;
  userName: string;
  userAvatar: string;
  auth: UserData | null;
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
  const [auth, setAuth] = useState<UserData | null>(null);
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
    const getAuth = async () => {
      const result = await fetchMe();
      const authData = result.status === 'success' ? result.data : null;
      setAuth(authData);
    };

    checkSession();
    getAuth();
  }, [getUser]);

  const login = useCallback(
    async (formData: z.infer<typeof loginFormSchema>) => {
      const result = await authLogin(formData);
      const session = await getSession();
      const response = await fetchMe();

      if (response.status === 'success' && response.data) {
        const { data } = response;
        setAuth(data);
        setUserName(data.displayName);
      }

      setIsLoggedin(!!session);
      // if (session) router.push('/user/about');
      if (session) {
        router.push('/redirect');
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
      getUser,
      userName,
      userAvatar,
      auth,
    }),
    [isLoggedin, login, logout, getUser, userName, userAvatar, auth]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
