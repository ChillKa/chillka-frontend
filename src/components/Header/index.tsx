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
    <>
      <header className="flex w-full justify-center bg-surface px-3">
        <div className="flex h-28 w-full max-w-[81rem] items-center justify-between bg-surface">
          <LogoButton />
          <div className="flex items-center justify-center">
            {isLoggedin && device === 'PC' && (
              <>
                <EmailButton />
                <NotificationButton />
              </>
            )}
            <HamburgerBotton
              isLoggedin={isLoggedin}
              onSignOut={handleSignOut}
            />
          </div>
        </div>
        {device === 'PC' && <div className="h-14 bg-surface" />}
      </header>
      <div className="border" />
    </>
  );
};

export default Header;
