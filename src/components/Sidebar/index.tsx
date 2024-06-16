import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@components/ui/dialog';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const defaultAvatar = '/header__defaultAvatar.svg';
const fakeAvatar = '/header__fakeAvatar.svg';

type SidebarProps = {
  isLoggedin: boolean;
  onSignOut: () => void;
};

const Sidebar = ({ isLoggedin, onSignOut }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(onSignOut);

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
      <DialogContent hideCloseButton className="h-svh w-svw">
        <DialogClose asChild>
          <button
            type="button"
            aria-label="Toggle menu"
            className="fixed right-[0.75rem] top-[1.5rem] h-[4rem] w-[7rem] rounded-full opacity-0"
          />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default Sidebar;
