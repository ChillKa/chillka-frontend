'use client';

import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { H2, P } from '@components/ui/typography';
import { XIcon } from 'lucide-react';
import { useState } from 'react';
import QRCodeScanner, { QRCodeScannerProps } from './QRCodeScanner';

export type QRCodeScannerDialogButtonProps = {
  name: string;
  onScanSuccess: (result: string) => Promise<{
    status: 'fail' | 'success';
    message: string;
  }>;
};

const QRCodeScannerDialogButton = ({
  name,
  onScanSuccess,
}: QRCodeScannerDialogButtonProps) => {
  const [currentSerials, setCurrentSerials] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState<{
    status: 'fail' | 'success';
    message: string;
  } | null>(null);

  const handleScanSuccess: QRCodeScannerProps['onScanSuccess'] = async (
    result
  ) => {
    setCurrentSerials(result);
    setIsLoading(true);
    setScanResult(null);
    try {
      const response = await onScanSuccess(result);
      setScanResult(response);
    } catch (error) {
      setScanResult({ status: 'fail', message: '發生未知錯誤' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualInput = () => {
    if (currentSerials) {
      handleScanSuccess(currentSerials);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="xl:w-full xl:max-w-fit">
          {name}
        </Button>
      </DialogTrigger>
      <DialogContent
        hideCloseButton
        className="w-vh flex h-svh flex-col xl:h-auto xl:min-h-[35rem] xl:w-[27rem]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DialogHeader className="relative h-fit px-6 pb-6 pt-24 xl:pt-12">
          <DialogTitle
            asChild
            className="flex items-end justify-between text-primary"
          >
            <div>
              <H2>掃描 QR Code 以使用票券</H2>
              <DialogClose className="absolute right-0 top-0 flex h-20 w-20 items-center justify-center bg-primary xl:h-12 xl:w-12">
                <XIcon className="size-6 stroke-white" />
              </DialogClose>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex h-full w-full flex-col justify-start gap-4 px-6 pb-12 text-primary">
          <P className="break-words font-medium">序號：{currentSerials}</P>
          <div className="flex flex-row gap-2">
            <Input
              variant="form"
              placeholder="輸入序號"
              value={currentSerials}
              onChange={(e) => setCurrentSerials(e.target.value)}
            />
            <Button
              variant="default"
              onClick={handleManualInput}
              disabled={isLoading}
            >
              提交
            </Button>
          </div>
          {isLoading && <P>正在處理...</P>}
          {scanResult && (
            <P
              className={
                scanResult.status === 'success'
                  ? 'text-green-500'
                  : 'text-red-500'
              }
            >
              {scanResult.message}
            </P>
          )}
          <QRCodeScanner onScanSuccess={handleScanSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeScannerDialogButton;
