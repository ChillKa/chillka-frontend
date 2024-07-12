'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { formatPrice } from '@lib/fomatPrice';
import { QrCode, X } from 'lucide-react';
import { ReactNode, useState } from 'react';

type TicketPopUpProps = {
  ticketName: string;
  ticketQuantity: number;
  orderNumber: string;
  endTime: string;
  organizer: string;
  purchaseDate: string;
  price: number;
  pay: string;
  state: string;
  // link?: string;
  children?: ReactNode;
};

const TicketPopUp = ({
  ticketName,
  ticketQuantity,
  orderNumber,
  endTime,
  organizer,
  purchaseDate,
  price,
  pay,
  state,
  // link,
  children,
}: TicketPopUpProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger onClick={handleOpen} asChild>
        {children}
      </DialogTrigger>
      <DialogContent
        className="w-vw h-svh text-primary xl:h-fit xl:w-[67.25rem]"
        hideCloseButton
      >
        <button
          className="absolute right-0 top-0 flex h-[5rem] w-[5rem] items-center justify-center bg-primary xl:h-12 xl:w-12"
          onClick={handleClose}
          aria-label="ticket"
          type="button"
        >
          <X className="stroke-white" size={24} />
        </button>
        <div className="h-[calc(100svh-5.5rem)] min-h-[25rem] overflow-scroll px-3 pt-10 xl:h-fit xl:min-h-0 xl:overflow-visible xl:px-6 xl:pb-0 xl:pt-12">
          <DialogTitle className="mb-11 text-4xl font-bold xl:hidden">
            票券內容
          </DialogTitle>
          <p className="mb-4 text-2xl font-bold underline xl:mb-[1.625rem] xl:text-3xl xl:no-underline">
            {ticketName}
          </p>
          <div className="mb-[1.125rem] flex text-base xl:mb-[1.625rem]">
            <p className="font-normal">訂單編號：</p>
            <p className="font-medium">{orderNumber}</p>
          </div>
          <div className="flex">
            <div className="mr-2 bg-primary px-2 py-1 text-xs/5 font-medium text-white">
              數量：{ticketQuantity}
            </div>
            <div className="bg-primary px-2 py-1 text-xs/5 font-medium text-white">
              使用期限：{formatDate(endTime)}
            </div>
          </div>
          <ul className="xl:py- mt-4 border-b-[0.0625rem] border-t-[0.0625rem] pb-2 pt-4 xl:my-6 xl:flex xl:border-none xl:py-4">
            <li className="mb-2 flex justify-between border-primary xl:w-[30.25rem] xl:flex-col xl:border-x-[0.0625rem] xl:px-4">
              <p className="text-sm/6 font-medium xl:mb-2">主辦方</p>
              <p className="text-base/7 font-normal">{organizer}</p>
            </li>
            <li className="mb-2 flex justify-between border-primary xl:w-[8.5rem] xl:flex-col xl:border-r-[0.0625rem] xl:px-4 ">
              <p className="text-sm/6 font-medium xl:mb-2">購買日期</p>
              <p className="text-base/7 font-normal">
                {formatDate(purchaseDate)}
              </p>
            </li>
            <li className="mb-2 flex justify-between border-primary xl:w-[8.5rem] xl:flex-col xl:border-r-[0.0625rem] xl:px-4">
              <p className="text-sm/6 font-medium xl:mb-2">總共金額</p>
              <p className="text-base/7 font-normal">NT${formatPrice(price)}</p>
            </li>
            <li className="justify-betwee xl:px-4n mb-2 flex border-primary xl:w-[8.5rem] xl:flex-col xl:border-r-[0.0625rem] xl:px-4">
              <p className="text-sm/6 font-medium xl:mb-2">付款方式</p>
              <p className="text-base/7 font-normal">{pay}</p>
            </li>
            <li className="xl:px-4n mb-2 flex justify-between border-primary xl:w-[8.5rem] xl:flex-col xl:border-r-[0.0625rem] xl:px-4">
              <p className="text-sm/6 font-medium xl:mb-2">訂單狀態</p>
              <p className="text-base/7 font-normal">{state}</p>
            </li>
          </ul>
        </div>
        <DialogFooter className="flex h-[5.5rem] flex-row items-center justify-center border-t-[0.0625rem] px-4 py-3 xl:h-[4.5rem] xl:flex-row-reverse xl:justify-between xl:border-none xl:p-0 xl:px-6 xl:pb-6">
          <button
            onClick={handleClose}
            className="flex h-[3.5rem] flex-1 items-center justify-start text-base font-medium xl:h-[3rem] xl:w-[7rem] xl:flex-none xl:justify-center xl:border xl:border-primary"
            aria-label="Cancel Participation"
            type="button"
          >
            取消參加
          </button>
          <button
            className="flex h-[3.5rem] flex-1 items-center justify-center bg-primary text-base font-medium text-white xl:h-[3rem] xl:w-[9rem] xl:flex-none xl:flex-row-reverse"
            aria-label="Use Ticket"
            type="button"
          >
            使用票券
            <QrCode className="xl:mr-4" size={16} />
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TicketPopUp;
