import UserLoginButton from './user/UserLoginButton';
import UserProfileButton from './user/UserProfileButton';
import UserResgisterButton from './user/UserRegisterButton';

interface HeaderProps {
  isLogin?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLogin = false }) => {
  return (
    <nav className="flex h-[var(--header-height)] w-full items-center justify-between bg-gray-600">
      <div>我是Header</div>

      <section className="my-1 mr-3 flex gap-2">
        {isLogin ? (
          <UserProfileButton />
        ) : (
          <>
            <UserLoginButton />
            <UserResgisterButton />
          </>
        )}
      </section>
    </nav>
  );
};

export default Header;
