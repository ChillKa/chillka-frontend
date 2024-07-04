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
import { motion, useCycle } from 'framer-motion';
import Link from 'next/link';
import { menuAnimation } from './utils';

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
  const [isOpen, toggleOpen] = useCycle(false, true);

  const handlePopoverClick = (event: React.MouseEvent) => {
    const isLinkClick = (event.target as HTMLElement).closest('a');
    if (isLinkClick) toggleOpen();
  };

  const changeIsOpen = (open: boolean) => {
    if (open !== isOpen) toggleOpen();
  };

  return (
    <Popover open={isOpen} onOpenChange={changeIsOpen}>
      <PopoverTrigger>
        <Hamburger isOpen={isOpen} isLoggedin={isLoggedin} />
      </PopoverTrigger>
      <PopoverContent
        onClickCapture={handlePopoverClick}
        className="h-0 w-0 border-none bg-transparent p-0 text-primary"
      >
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
          <div
            className={`no-scrollbar absolute right-[-3.5rem] box-content hidden h-fit max-h-[28.875rem] w-[17rem] overflow-scroll rounded-[2rem] border-4 border-primary bg-surface pt-6 xl:block ${!isLoggedin && 'pb-2'}`}
          >
            {isLoggedin ? (
              <>
                {userList.map((user: List) => (
                  <motion.li
                    variants={menuAnimation}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={user.name}
                  >
                    <Link
                      className="mb-4 flex justify-between px-8 py-[0.625rem] hover:bg-primary/[0.03]"
                      key={user.name}
                      href={user.url}
                    >
                      <div className="text-xl font-bold">{user.name}</div>
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
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={list.name}
                  >
                    <Link
                      className="mb-4 flex justify-between px-8 py-[0.625rem] hover:bg-primary/[0.03]"
                      href={list.url}
                    >
                      <div className="text-xl font-bold">{list.name}</div>
                      {list.icon && list.icon}
                    </Link>
                  </motion.li>
                ))}
              </>
            )}
            {!isLoggedin && (
              <>
                <motion.li variants={menuAnimation}>
                  <Separator className="mb-4 h-[0.0625rem] bg-primary" />
                </motion.li>
                {SITEMAP.map((map: List) => (
                  <motion.li
                    variants={menuAnimation}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={map.name}
                  >
                    <Link
                      className="mb-4 flex justify-between px-8 py-2 hover:bg-primary/[0.03]"
                      href={map.url}
                    >
                      <div className="text-base leading-7">{map.name}</div>
                    </Link>
                  </motion.li>
                ))}
              </>
            )}
            {isLoggedin && (
              <>
                <motion.li
                  variants={menuAnimation}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Separator className="h-[0.0625rem] bg-primary" />
                </motion.li>
                <motion.li
                  variants={menuAnimation}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
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
                </motion.li>
              </>
            )}
          </div>
        </motion.ul>
      </PopoverContent>
    </Popover>
  );
};

export default HamburgerBotton;
