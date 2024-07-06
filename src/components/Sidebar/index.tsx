'use client';

import Hamburger from '@components/Hamburger';
import {
  SITEMAP,
  phoneList,
  registerAndLoginList,
  userList,
} from '@components/Header/menu';
import { menuAnimation } from '@components/Header/utils';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@components/ui/dialog';
import { Separator } from '@components/ui/separator';
import { motion, useCycle } from 'framer-motion';
import Link from 'next/link';

type SidebarProps = {
  isLoggedin: boolean;
  onSignOut: () => void;
  userName: string;
  userAvatar: string;
};

type List = {
  name: string;
  icon?: JSX.Element;
  url: string;
};

const Sidebar = ({
  isLoggedin,
  onSignOut,
  userName,
  userAvatar,
}: SidebarProps) => {
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
        <DialogTrigger>
          <Hamburger
            className={
              isOpen ? 'fixed right-[0.75rem] top-[1.25rem] z-[51]' : ''
            }
            isOpen={isOpen}
            isLoggedin={isLoggedin}
            userName={userName}
            userAvatar={userAvatar}
          />
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
                  {phoneList.map((mobile: List) => (
                    <motion.li
                      variants={menuAnimation}
                      whileHover={{ scale: 1.025 }}
                      whileTap={{ scale: 0.95 }}
                      key={mobile.name}
                    >
                      <Link
                        className="mb-4 flex justify-between px-[1.5rem] py-[0.375rem] text-xl font-bold hover:bg-primary/[0.03]"
                        href={mobile.url}
                      >
                        <p>{mobile.name}</p>
                        {mobile.icon && mobile.icon}
                      </Link>
                    </motion.li>
                  ))}
                  {userList.map((user: List) => (
                    <motion.li
                      variants={menuAnimation}
                      whileHover={{ scale: 1.025 }}
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
                      whileHover={{ scale: 1.025 }}
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
              {!isLoggedin && (
                <>
                  <motion.div variants={menuAnimation}>
                    <Separator className="mb-4 h-[0.0625rem] bg-primary" />
                  </motion.div>

                  {SITEMAP.map((map: List) => (
                    <motion.li
                      variants={menuAnimation}
                      whileHover={{ scale: 1.025 }}
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
                </>
              )}
              {isLoggedin && (
                <>
                  <motion.div variants={menuAnimation}>
                    <Separator className="mb-4 h-[0.0625rem] bg-primary" />
                  </motion.div>
                  <Link href="/">
                    <motion.li
                      variants={menuAnimation}
                      whileHover={{ scale: 1.025 }}
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
