'use client';

import HamburgerBotton from '@components/user/Header/HamburgerBotton';
import LogoButton from '@components/user/Header/LogoButton';
// import { useAuthContext } from 'src/store/AuthProvider/AuthProvider';

const Header = () => {
  // const { isLoggedin, logout } = useAuthContext();

  // const handleSignOut: UserProfileButtonProps['onSignOut'] = () => {
  //   logout();
  // };

  return (
    <header className="flex h-[112px] w-full items-center justify-between bg-[#e8e4de] px-3 ">
      <LogoButton />
      <div className="flex">
        <HamburgerBotton />
      </div>
    </header>
  );
};

export default Header;
