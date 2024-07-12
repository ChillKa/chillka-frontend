'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import useWindowSize from '@hooks/use-window-size';
import { ArrowRight, QrCode, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';

type QRCodeType = {
  name: string;
  startTime: string;
  endTime: string;
  serialNumber: string;
};

const QRCodePopUp = ({
  name,
  startTime,
  endTime,
  serialNumber,
}: QRCodeType) => {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowSize();

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // 月份从0开始
    const day = String(date.getUTCDate()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    const dateStringFormatted = `${year}.${month}.${day}`;
    return {
      date: dateStringFormatted,
      tiem: timeString,
    };
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
        e.stopPropagation()
      }
    >
      <Dialog open={isOpen}>
        <DialogTrigger onClick={handleOpen}>
          {width > 1366 ? (
            <QrCode size={40} />
          ) : (
            <div className="mt-4 flex w-fit items-center justify-center border border-black px-6 py-4 text-base font-medium">
              <QrCode size={16} />
              <p className="ml-4">使用票券</p>
            </div>
          )}
        </DialogTrigger>
        <DialogContent
          className="w-vh h-svh xl:h-[44.25rem] xl:w-[26rem]"
          hideCloseButton
        >
          <button
            className="absolute right-0 top-0 flex h-[5rem] w-[5rem] items-center justify-center bg-primary xl:h-[2.375rem] xl:w-[2.375rem]"
            onClick={handleClose}
            aria-label="QRCode"
            type="button"
          >
            <X className="stroke-white" size={24} />
          </button>
          <div className="flex h-[calc(100svh-30px)] flex-col overflow-scroll px-3 pb-6 pt-10 xl:h-fit xl:px-6 xl:pt-12">
            <DialogTitle className="mb-[2.5rem] text-3xl font-bold xl:mb-6">
              票券可使用時間
            </DialogTitle>
            <div className="mb-6 flex items-center justify-center">
              <div className="max-w-[12rem] flex-1 text-center">
                <p className="mb-2 text-3xl font-bold">
                  {formatDateTime(startTime).tiem}
                </p>
                <p className="text-sm/7">{formatDateTime(startTime).date}</p>
              </div>
              <ArrowRight className="mx-6" size={24} />
              <div className="max-w-[12rem] flex-1 text-center">
                <p className="mb-2 text-3xl font-bold">
                  {formatDateTime(endTime).tiem}
                </p>
                <p className="text-sm/7">{formatDateTime(endTime).date}</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <QRCodeSVG value={serialNumber} size={width > 1366 ? 368 : 351} />
            </div>
            <div className="my-6 h-1 w-full border-t border-dashed border-black" />
            <p className="m-auto py-4 text-center">參加人：{name}</p>
          </div>
          <DialogFooter className="flex h-[1.875rem] items-center justify-center bg-primary text-sm text-white">
            票券編號：{serialNumber}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QRCodePopUp;
