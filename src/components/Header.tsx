'use client';

import { useAuthContext } from 'src/store/AuthProvider/AuthProvider';
import LoginButton from './user/LoginButton';
import ResgisterButton from './user/RegisterButton';
import UserProfileButton from './user/UserProfileButton';
import { UserProfileButtonProps } from './user/UserProfileButton/UserProfileButton';

const Header: React.FC = () => {
  const { isLoggedin, logout } = useAuthContext();

  const handleSignOut: UserProfileButtonProps['onSignOut'] = () => {
    logout();
  };

  return (
    <nav className="flex h-[var(--header-height)] w-full items-center justify-between bg-gray-600">
      <div>我是Header</div>

      <section className="my-1 mr-3 flex gap-2">
        {isLoggedin ? (
          <UserProfileButton onSignOut={handleSignOut} />
        ) : (
          <>
            <LoginButton />
            <ResgisterButton />
          </>
        )}
      </section>
    </nav>
  );
};

export default Header;
