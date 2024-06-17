import {
  SITEMAP,
  registerAndLoginList,
  userList,
} from '@components/Header/menu';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@components/ui/dialog';
import { Separator } from '@components/ui/separator';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const defaultAvatar = '/header__defaultAvatar.svg';
const fakeAvatar = '/header__fakeAvatar.svg';

type SidebarProps = {
  isLoggedin: boolean;
  onSignOut: () => void;
};

type List = {
  name: string;
  icon?: JSX.Element;
  url: string;
};

const Sidebar = ({ isLoggedin, onSignOut }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePopoverClick = (event: React.MouseEvent) => {
    const isLinkClick = (event.target as HTMLElement).closest('a');
    if (isLinkClick) setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        className={`
          ${isOpen && 'fixed right-[0.75rem] top-[1.5rem] z-[51]'} 
          mx-[0.1875rem] flex h-[4rem] w-[7rem] items-center justify-center rounded-full border border-primary bg-surface p-3 data-[state=open]:mx-0 data-[state=open]:border-4`}
      >
        <div className="p-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
        <Image
          className="ml-2"
          src={isLoggedin ? fakeAvatar : defaultAvatar}
          alt="user"
          width={40}
          height={40}
        />
      </DialogTrigger>
      <DialogContent
        hideCloseButton
        className="block h-svh w-svw"
        onClickCapture={handlePopoverClick}
      >
        <DialogClose asChild>
          <button
            type="button"
            aria-label="Toggle menu"
            className="fixed right-[0.75rem] top-[1.5rem] h-[4rem] w-[7rem] rounded-full opacity-0"
          />
        </DialogClose>
        <div className="no-scrollbar mt-[7rem] h-[calc(100svh-7rem)] overflow-scroll">
          {isLoggedin ? (
            <>
              {userList.map((user: List) => (
                <Link
                  className="mb-4 flex justify-between px-[1.5rem] py-[0.375rem] text-xl font-bold hover:bg-primary/[0.03]"
                  key={user.name}
                  href={user.url}
                >
                  <p>{user.name}</p>
                  {user.icon && user.icon}
                </Link>
              ))}
            </>
          ) : (
            <>
              {registerAndLoginList.map((list: List) => (
                <Link
                  className="mb-4 flex justify-between px-[1.5rem] py-[0.375rem] text-xl font-bold hover:bg-primary/[0.03]"
                  key={list.name}
                  href={list.url}
                >
                  <p>{list.name}</p>
                  {list.icon && list.icon}
                </Link>
              ))}
            </>
          )}
          <Separator className="mb-4 h-[0.0625rem] bg-primary" />
          {SITEMAP.map((map: List) => (
            <Link
              className="mb-4 flex justify-between px-[1.5rem] py-[0.5rem] text-base/7 hover:bg-primary/[0.03]"
              key={map.name}
              href={map.url}
            >
              <div>{map.name}</div>
            </Link>
          ))}
          {isLoggedin && (
            <>
              <Separator className="h-[0.0625rem] bg-primary" />
              <Link href="/">
                <button
                  type="button"
                  className="block h-[4.75rem] w-full px-8 py-0 text-start text-base hover:bg-primary/[0.03]"
                  onClick={() => {
                    onSignOut?.();
                  }}
                >
                  登出
                </button>
              </Link>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Sidebar;
