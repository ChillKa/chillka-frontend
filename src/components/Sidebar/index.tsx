import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@components/ui/dialog';
import { useState } from 'react';
import HamburgerBotton from './HamburgerBotton';

type SidebarProps = {
  isLoggedin: boolean;
  onSignOut: () => void;
};

const Sidebar = ({ isLoggedin, onSignOut }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(onSignOut);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <HamburgerBotton
          isOpen={isOpen}
          isLoggedin={isLoggedin}
          onClick={() => setIsOpen(true)}
        />
      </DialogTrigger>
      <DialogContent className="h-svh w-svw">
        <DialogClose asChild>
          <HamburgerBotton
            isOpen={isOpen}
            isLoggedin={isLoggedin}
            onClick={() => setIsOpen(false)}
          />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default Sidebar;
