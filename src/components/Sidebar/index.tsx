'use client';

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
import { SVGMotionProps, motion, useCycle } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

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

const Path = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="#403E3D"
    strokeLinecap="round"
    {...props}
  />
);

const menuAnimation = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const Sidebar = ({ isLoggedin, onSignOut }: SidebarProps) => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  const handleDialogClick = (event: React.MouseEvent) => {
    const isLinkClick = (event.target as HTMLElement).closest('a');
    if (isLinkClick) toggleOpen();
  };

  const changeIsOpen = (open: boolean) => {
    if (open !== isOpen) toggleOpen();
  };

  return (
    <Dialog open={isOpen} onOpenChange={changeIsOpen}>
      <motion.nav initial={false} animate={isOpen ? 'open' : 'closed'}>
        <DialogTrigger
          asChild
          className={`
          ${isOpen && 'fixed right-[0.75rem] top-[1.5rem] z-[51]'} 
          mx-[0.1875rem] flex h-[4rem] w-[7rem] items-center justify-center rounded-full border border-primary bg-surface p-3 data-[state=open]:mx-0 data-[state=open]:border-4`}
        >
          <div>
            <div className="p-2">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <Path
                  variants={{
                    closed: { d: 'M 3 6 L 21 6' },
                    open: { d: 'M 3 18 L 21 6' },
                  }}
                  initial={false}
                  animate={isOpen ? 'open' : 'closed'}
                />
                <Path
                  d="M 3 12 L 21 12"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  transition={{ duration: 0.1 }}
                  initial={false}
                  animate={isOpen ? 'open' : 'closed'}
                />
                <Path
                  variants={{
                    closed: { d: 'M 3 18 L 21 18' },
                    open: { d: 'M 3 6 L 21 18' },
                  }}
                  initial={false}
                  animate={isOpen ? 'open' : 'closed'}
                />
              </svg>
            </div>
            <Image
              className="ml-2"
              src={isLoggedin ? fakeAvatar : defaultAvatar}
              alt="user"
              width={40}
              height={40}
            />
          </div>
        </DialogTrigger>
        <DialogContent
          hideCloseButton
          className="block h-svh w-svw"
          onClickCapture={handleDialogClick}
        >
          <DialogClose asChild>
            <button
              type="button"
              aria-label="Toggle menu"
              className="fixed right-[0.75rem] top-[1.5rem] h-[4rem] w-[7rem] rounded-full opacity-0"
            />
          </DialogClose>
          <div className="no-scrollbar mt-[7rem] h-[calc(100svh-7rem)] overflow-scroll">
            <motion.ul
              initial="closed"
              animate={isOpen ? 'open' : 'closed'}
              variants={{
                open: {
                  transition: { staggerChildren: 0.07, delayChildren: 0.2 },
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
            >
              {isLoggedin ? (
                <>
                  {userList.map((user: List) => (
                    <motion.li
                      variants={menuAnimation}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      key={user.name}
                    >
                      <Link
                        className="mb-4 flex justify-between px-[1.5rem] py-[0.375rem] text-xl font-bold hover:bg-primary/[0.03]"
                        href={user.url}
                      >
                        <p>{user.name}</p>
                        {user.icon && user.icon}
                      </Link>
                    </motion.li>
                  ))}
                </>
              ) : (
                <>
                  {registerAndLoginList.map((list: List) => (
                    <motion.li
                      variants={menuAnimation}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      key={list.name}
                    >
                      <Link
                        className="mb-4 flex justify-between px-[1.5rem] py-[0.375rem] text-xl font-bold hover:bg-primary/[0.03]"
                        href={list.url}
                      >
                        <p>{list.name}</p>
                        {list.icon && list.icon}
                      </Link>
                    </motion.li>
                  ))}
                </>
              )}
              <motion.div
                variants={menuAnimation}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Separator className="mb-4 h-[0.0625rem] bg-primary" />
              </motion.div>
              {SITEMAP.map((map: List) => (
                <motion.li
                  variants={menuAnimation}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  key={map.name}
                >
                  <Link
                    className="mb-4 flex justify-between px-[1.5rem] py-[0.5rem] text-base/7 hover:bg-primary/[0.03]"
                    href={map.url}
                  >
                    <div>{map.name}</div>
                  </Link>
                </motion.li>
              ))}
              {isLoggedin && (
                <>
                  <motion.div
                    variants={menuAnimation}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Separator className="mb-4 h-[0.0625rem] bg-primary" />
                  </motion.div>
                  <Link href="/">
                    <motion.li
                      variants={menuAnimation}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button
                        type="button"
                        className="block h-[4.75rem] w-full px-8 py-0 text-start text-base hover:bg-primary/[0.03]"
                        onClick={() => {
                          onSignOut?.();
                        }}
                      >
                        登出
                      </button>
                    </motion.li>
                  </Link>
                </>
              )}
            </motion.ul>
          </div>
        </DialogContent>
      </motion.nav>
    </Dialog>
  );
};

export default Sidebar;
