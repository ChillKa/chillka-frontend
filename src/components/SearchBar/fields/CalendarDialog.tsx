import { Calendar } from '@components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { ReactNode, useState } from 'react';

export type CalendarDialogProps = {
  triggerElement: ReactNode;
  selectedDate?: Date;
  onSelect?: (date: Date | undefined) => void;
};

const CalendarDialog = ({
  triggerElement,
  selectedDate,
  onSelect,
}: CalendarDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSelect = (date: Date | undefined) => {
    onSelect?.(date);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      <DialogContent hideCloseButton className="w-full/2 p-1">
        <DialogHeader>
          <DialogTitle>自訂日期</DialogTitle>
        </DialogHeader>
        <div id="wrapper" className="mx-auto flex items-center justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            initialFocus
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarDialog;
