'use client';

import HamburgerBotton from '@components/Header/HamburgerBotton';
import LogoButton from '@components/Header/LogoButton';
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
    <header className="flex h-[112px] w-full items-center justify-between bg-[#e8e4de] px-3 ">
      <LogoButton />
      <div className="flex">
        <HamburgerBotton isLoggedin={isLoggedin} onSignOut={handleSignOut} />
      </div>
    </header>
  );
};

export default Header;
