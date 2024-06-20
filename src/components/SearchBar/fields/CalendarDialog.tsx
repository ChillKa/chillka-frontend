import { Button } from '@components/ui/button';
import { Calendar } from '@components/ui/calendar';
import { Dialog, DialogContent, DialogTrigger } from '@components/ui/dialog';
import { Lead } from '@components/ui/typography';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useState } from 'react';

export type CalendarDialogProps = {
  selectedDate?: Date;
  onSelect?: (date: Date | undefined) => void;
};

const CalendarDialog = ({ selectedDate, onSelect }: CalendarDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSelect = (date: Date | undefined) => {
    onSelect?.(date);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-[280px] justify-start text-left font-normal"
        >
          <motion.li
            variants={{
              open: {
                y: 0,
                opacity: 1,
                transition: {
                  y: { stiffness: 1000, velocity: -100 },
                },
              },
              closed: {
                y: 30,
                opacity: 0,
                transition: {
                  y: { stiffness: 1000 },
                },
              },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex w-full items-center justify-between"
          >
            {selectedDate ? (
              <Lead className="text-primary">
                {format(selectedDate, 'PPP')}
              </Lead>
            ) : (
              <Lead className="text-primary">自訂日期</Lead>
            )}
          </motion.li>
        </Button>
      </DialogTrigger>
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
