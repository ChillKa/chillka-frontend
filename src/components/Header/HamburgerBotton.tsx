import {
  SITEMAP,
  phoneList,
  registerAndLoginList,
  userList,
} from '@components/Header/menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import useRWD from '@hook/useRWD';
import cross from '@public/header__cross.svg';
import defaultAvatar from '@public/header__defaultAvatar.svg';
import fakeAvatar from '@public/header__fakeAvatar.svg';
import hamburger from '@public/header__hamburger.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type Props = {
  isLoggedin: boolean;
  onSignOut: () => void;
};

type List = {
  name: string;
  icon?: string;
  url: string;
};

const HamburgerBotton = ({ isLoggedin, onSignOut }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const device = useRWD();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="flex flex-col items-center justify-center">
        <div className="flex h-16 w-[112px]  items-center justify-center  rounded-full border border-black">
          <div className="flex h-10 w-10 items-center justify-center">
            {isOpen ? (
              <Image src={cross} alt="cross" />
            ) : (
              <Image src={hamburger} alt="hamburger" />
            )}
          </div>
          <Image
            className="ml-2"
            src={isLoggedin ? fakeAvatar : defaultAvatar}
            alt="user"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="h-0 w-0 border-none bg-transparent p-0">
        <div className=" absolute right-[-68px] top-4 h-[100vh] w-[100vw] overflow-scroll bg-[#e8e4de] pt-6 xl:right-[-56px] xl:h-fit xl:max-h-[450px] xl:w-[272px] xl:rounded-[32px] xl:border xl:border-black ">
          {isLoggedin ? (
            <>
              {device === 'mobile' &&
                phoneList.map((list: List) => (
                  <Link
                    className="mb-4 flex justify-between px-8 py-2 "
                    key={list.name}
                    href={list.url}
                  >
                    <div className="text-xl font-semibold">{list.name}</div>
                    {list.icon && (
                      <Image className="" src={list.icon} alt={list.name} />
                    )}
                  </Link>
                ))}
              {userList.map((user: List) => (
                <Link
                  className="mb-4 flex justify-between px-8 py-2  "
                  key={user.name}
                  href={user.url}
                >
                  <div className="text-xl font-semibold">{user.name}</div>
                  {user.icon && (
                    <Image className="" src={user.icon} alt={user.name} />
                  )}
                </Link>
              ))}
            </>
          ) : (
            <>
              {registerAndLoginList.map((list: List) => (
                <Link
                  className="mb-4 flex justify-between px-8 py-2  "
                  key={list.name}
                  href={list.url}
                >
                  <div className="text-xl font-semibold">{list.name}</div>
                  {list.icon && (
                    <Image className="" src={list.icon} alt={list.name} />
                  )}
                </Link>
              ))}
            </>
          )}

          <div className="mb-4 h-[1px] w-full bg-black" />
          {SITEMAP.map((map: List) => (
            <Link
              className="mb-4 flex justify-between px-8 py-2"
              key={map.name}
              href={map.url}
            >
              <div className="text-base">{map.name}</div>
            </Link>
          ))}

          {isLoggedin && (
            <>
              <div className=" h-[1px] w-full bg-black" />
              <Link href="/">
                <button
                  type="button"
                  className="block h-[76px] w-full px-8 py-0 text-start text-base"
                  onClick={() => {
                    setIsOpen(false);
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
