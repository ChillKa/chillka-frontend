import Hamburger from '@components/Hamburger';
import {
  SITEMAP,
  registerAndLoginList,
  userList,
} from '@components/Header/menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Separator } from '@components/ui/separator';
import Link from 'next/link';
import { useState } from 'react';

type HamburgerProps = {
  isLoggedin: boolean;
  onSignOut: () => void;
};

type List = {
  name: string;
  icon?: JSX.Element;
  url: string;
};

const HamburgerBotton = ({ isLoggedin, onSignOut }: HamburgerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePopoverClick = (event: React.MouseEvent) => {
    const isLinkClick = (event.target as HTMLElement).closest('a');
    if (isLinkClick) setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Hamburger isOpen={isOpen} isLoggedin={isLoggedin} />
      </PopoverTrigger>
      <PopoverContent
        onClickCapture={handlePopoverClick}
        className="h-0 w-0 border-none bg-transparent p-0 text-primary"
      >
        <div
          className={`no-scrollbar absolute right-[-3.5rem] box-content hidden h-fit max-h-[28.875rem] w-[17rem] overflow-scroll rounded-[2rem] border-4 border-primary bg-surface pt-6 xl:block ${!isLoggedin && 'pb-2'}`}
        >
          {isLoggedin ? (
            <>
              {userList.map((user: List) => (
                <Link
                  className="mb-4 flex justify-between px-8 py-[0.625rem] hover:bg-primary/[0.03]"
                  key={user.name}
                  href={user.url}
                >
                  <div className="text-xl font-bold">{user.name}</div>
                  {user.icon && user.icon}
                </Link>
              ))}
            </>
          ) : (
            <>
              {registerAndLoginList.map((list: List) => (
                <Link
                  className="mb-4 flex justify-between px-8 py-[0.625rem] hover:bg-primary/[0.03]"
                  key={list.name}
                  href={list.url}
                >
                  <div className="text-xl font-bold">{list.name}</div>
                  {list.icon && list.icon}
                </Link>
              ))}
            </>
          )}
          <Separator className="mb-4 h-[0.0625rem] bg-primary" />
          {SITEMAP.map((map: List) => (
            <Link
              className="mb-4 flex justify-between px-8 py-2 hover:bg-primary/[0.03]"
              key={map.name}
              href={map.url}
            >
              <div className="text-base leading-7">{map.name}</div>
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
      </PopoverContent>
    </Popover>
  );
};

export default HamburgerBotton;
