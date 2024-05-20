'use client';

// import HamburgerBotton from '@components/Header/HamburgerBotton';
import LogoButton from '@components/Header/LogoButton';
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
        {/* <HamburgerBotton isLoggedin={isLoggedin} /> */}
      </div>
    </header>
  );
};

export default Header;
