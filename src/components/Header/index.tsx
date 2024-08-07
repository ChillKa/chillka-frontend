'use client';

import EmailButton from '@components/Header/EmailButton';
import HamburgerBotton from '@components/Header/HamburgerBotton';
import NotificationButton from '@components/Header/NotificationButton';
import LogoButton from '@components/LogoButton';
import Sidebar from '@components/Sidebar';
import useWindowSize from '@hooks/use-window-size';
import { useAuthContext } from 'src/store/AuthProvider/AuthProvider';

export type UserProfileButtonProps = {
  onSignOut?: () => void;
};

const Header = () => {
  const { isLoggedin, logout, userName, userAvatar } = useAuthContext();
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
              {isLoggedin && <EmailButton />}
              {isLoggedin && <NotificationButton />}
              <HamburgerBotton
                isLoggedin={isLoggedin}
                onSignOut={handleSignOut}
                userName={userName}
                userAvatar={userAvatar}
              />
            </>
          ) : (
            <Sidebar
              isLoggedin={isLoggedin}
              onSignOut={handleSignOut}
              userName={userName}
              userAvatar={userAvatar}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
