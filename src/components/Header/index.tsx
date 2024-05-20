'use client';

import EmailButton from '@components/Header/EmailButton';
import HamburgerBotton from '@components/Header/HamburgerBotton';
import LogoButton from '@components/Header/LogoButton';
import NotificationButton from '@components/Header/NotificationButton';
import useRWD from '@hook/useRWD';
import { useAuthContext } from 'src/store/AuthProvider/AuthProvider';

export type UserProfileButtonProps = {
  onSignOut?: () => void;
};

const Header = () => {
  const { isLoggedin, logout } = useAuthContext();
  const device = useRWD();

  const handleSignOut: UserProfileButtonProps['onSignOut'] = () => {
    logout();
  };

  return (
    <header className="flex h-[112px] w-full items-center justify-between bg-[#e8e4de] px-3 ">
      <LogoButton />
      <div className="flex">
        {isLoggedin && device === 'PC' && (
          <>
            <NotificationButton />
            <EmailButton />
          </>
        )}
        <HamburgerBotton isLoggedin={isLoggedin} onSignOut={handleSignOut} />
      </div>
    </header>
  );
};

export default Header;
