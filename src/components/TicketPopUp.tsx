import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { QrCode, X } from 'lucide-react';
import { useState } from 'react';

type TicketPopUpProps = {
  children?: any;
};

const TicketPopUp = ({ children }: TicketPopUpProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger onClick={handleOpen} asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="w-vw h-svh text-primary" hideCloseButton>
        <button
          className="absolute right-0 top-0 flex h-[5rem] w-[5rem] items-center justify-center bg-primary"
          onClick={handleClose}
          aria-label="ticket"
          type="button"
        >
          <X className="stroke-white" size={24} />
        </button>
        <div className="h-[calc(100svh-5.5rem)] min-h-[25rem] overflow-scroll px-3 pt-10">
          <DialogTitle className="mb-11 text-4xl font-bold">
            票券內容
          </DialogTitle>
          <p className="mb-4 text-2xl font-bold underline">
            東京地鐵一日券/二日券/三日券|Tokyo Subway Ticket 半票
          </p>
          <div className="mb-[1.125rem] flex text-base">
            <p className="font-normal">訂單編號：</p>
            <p className="font-medium">N987654321987654321</p>
          </div>
          <div className="flex">
            <div className="mr-2 bg-primary px-2 py-1 text-xs/5 font-medium text-white">
              數量：4
            </div>
            <div className="bg-primary px-2 py-1 text-xs/5 font-medium text-white">
              使用期限：2024.1.1
            </div>
          </div>
          <ul className="mt-4 border-b-[0.0625rem] border-t-[0.0625rem] pb-2 pt-4">
            <li className="mb-2 flex justify-between">
              <p className="text-sm/6 font-medium">主辦方</p>
              <p className="text-base/7 font-normal">音樂之夜有限公司</p>
            </li>
            <li className="mb-2 flex justify-between">
              <p className="text-sm/6 font-medium">購買日期</p>
              <p className="text-base/7 font-normal">2020.10.10</p>
            </li>
            <li className="mb-2 flex justify-between">
              <p className="text-sm/6 font-medium">總共金額</p>
              <p className="text-base/7 font-normal">NT $9999,999</p>
            </li>
            <li className="mb-2 flex justify-between">
              <p className="text-sm/6 font-medium">付款方式</p>
              <p className="text-base/7 font-normal">信用卡</p>
            </li>
            <li className="mb-2 flex justify-between">
              <p className="text-sm/6 font-medium">訂單狀態</p>
              <p className="text-base/7 font-normal">已付款</p>
            </li>
          </ul>
        </div>
        <DialogFooter className="flex h-[5.5rem] flex-row items-center justify-center border-t-[0.0625rem] px-4 py-3">
          <button
            className="flex h-[3.5rem] flex-1 items-center justify-start text-base font-medium"
            aria-label="Cancel Participation"
            type="button"
          >
            取消參加
          </button>
          <button
            className="flex h-[3.5rem] flex-1 items-center justify-center bg-primary text-base font-medium text-white"
            aria-label="Use Ticket"
            type="button"
          >
            使用票券
            <QrCode size={16} />
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TicketPopUp;
