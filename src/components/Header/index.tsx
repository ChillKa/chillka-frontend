'use client';

import EmailButton from '@components/Header/EmailButton';
import HamburgerBotton from '@components/Header/HamburgerBotton';
import LogoButton from '@components/Header/LogoButton';
import NotificationButton from '@components/Header/NotificationButton';
import Sidebar from '@components/Sidebar';
import useWindowSize from '@hooks/use-window-size';
import { useAuthContext } from 'src/store/AuthProvider/AuthProvider';

export type UserProfileButtonProps = {
  onSignOut?: () => void;
};

const Header = () => {
  const { isLoggedin, logout } = useAuthContext();
  const { width } = useWindowSize();
  const handleSignOut: UserProfileButtonProps['onSignOut'] = () => {
    logout();
  };

  return (
    <header className="flex w-full flex-col items-center bg-surface px-3">
      <div className="flex h-28 w-full max-w-[81rem] items-center justify-between bg-surface xl:h-36">
        <LogoButton />
        <div className="flex items-center justify-center">
          {width > 1366 ? (
            <>
              <EmailButton />
              <NotificationButton />
              <HamburgerBotton
                isLoggedin={isLoggedin}
                onSignOut={handleSignOut}
              />
            </>
          ) : (
            <Sidebar isLoggedin={isLoggedin} onSignOut={handleSignOut} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
