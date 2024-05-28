'use client';

import EmailButton from '@components/Header/EmailButton';
import HamburgerBotton from '@components/Header/HamburgerBotton';
import LogoButton from '@components/Header/LogoButton';
import NotificationButton from '@components/Header/NotificationButton';
import { useAuthContext } from 'src/store/AuthProvider/AuthProvider';

export type UserProfileButtonProps = {
  onSignOut?: () => void;
};

const Header = () => {
  const { isLoggedin, logout } = useAuthContext();
  const handleSignOut: UserProfileButtonProps['onSignOut'] = () => {
    logout();
  };

  return (
    <>
      <header className="flex w-full justify-center bg-surface px-3">
        <div className="flex h-28 w-full max-w-[81rem] items-center justify-between bg-surface">
          <LogoButton />
          <div className="flex items-center justify-center">
            <div className="hidden xl:block">
              <EmailButton />
              <NotificationButton />
            </div>
            <HamburgerBotton
              isLoggedin={isLoggedin}
              onSignOut={handleSignOut}
            />
          </div>
        </div>
        <div className="hidden h-14 bg-surface xl:block" />
      </header>
      <div className="border" />
    </>
  );
};

export default Header;
