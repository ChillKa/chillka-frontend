'use client';

import {
  login as authLogin,
  logout as authLogout,
  getSession,
} from '@action/auth';
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
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      setIsLoggedin(!!session);
    };

    checkSession();
  }, []);

  const login = useCallback(
    async (formData: z.infer<typeof loginFormSchema>) => {
      const result = await authLogin(formData);
      const session = await getSession();
      setIsLoggedin(!!session);

      if (session) router.push('/user/about');

      return result;
    },
    [router]
  );

  const logout = useCallback(async () => {
    await authLogout();
    setIsLoggedin(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      isLoggedin,
      login,
      logout,
    }),
    [isLoggedin, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
