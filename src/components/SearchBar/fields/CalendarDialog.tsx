import { Calendar } from '@components/ui/calendar';
import { Dialog, DialogContent, DialogTrigger } from '@components/ui/dialog';
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
      <DialogContent className="m-auto w-[350px]">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          initialFocus
        />
      </DialogContent>
    </Dialog>
  );
};

export default CalendarDialog;
