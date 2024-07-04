'use client';

import { Button } from '@components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@components/ui/dialog';
import QRCodeScanner from './QRCodeScanner';

type QRCodeScannerButtonProps = {
  name: string;
  onScanSuccess: (result: string) => void;
};

const QRCodeScannerDialogButton = ({
  name,
  onScanSuccess,
}: QRCodeScannerButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">{name}</Button>
      </DialogTrigger>
      <DialogContent
        className="w-vh h-svh xl:h-[44.25rem] xl:w-[26rem]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex w-full items-center justify-center">
          <QRCodeScanner onScanSuccess={onScanSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeScannerDialogButton;
