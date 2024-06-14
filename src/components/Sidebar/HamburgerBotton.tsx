import { Menu, X } from 'lucide-react';
import Image from 'next/image';

type SidebarHamburgerButton = {
  isOpen: boolean;
  isLoggedin: boolean;
  onClick: () => void;
};

const defaultAvatar = '/header__defaultAvatar.svg';
const fakeAvatar = '/header__fakeAvatar.svg';

const sidebarHamburgerButton = ({
  isOpen,
  isLoggedin,
  onClick,
}: SidebarHamburgerButton) => {
  return (
    <button
      type="button"
      className="mx-[0.1875rem] flex h-[4rem] w-[7rem] items-center justify-center rounded-full border border-primary bg-surface p-3 data-[state=open]:mx-0 data-[state=open]:border-4"
      onClick={onClick}
    >
      <div className="p-2">{isOpen ? <X size={24} /> : <Menu size={24} />}</div>
      <Image
        className="ml-2"
        src={isLoggedin ? fakeAvatar : defaultAvatar}
        alt="user"
        width={40}
        height={40}
      />
    </button>
  );
};

export default sidebarHamburgerButton;
