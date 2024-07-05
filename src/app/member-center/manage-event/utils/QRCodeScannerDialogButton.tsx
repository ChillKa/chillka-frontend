'use client';

import { Button } from '@components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { H3, P } from '@components/ui/typography';
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
        <Button variant="default" className="max-w-fit xl:w-full">
          {name}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-vh h-svh xl:h-[44.25rem] xl:w-[26rem]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="my-4 flex w-full flex-col items-center justify-start gap-4">
          <H3 asChild className="mb-4">
            <div>掃描QR Code以使用票券</div>
          </H3>
          <div>
            <P>序號: {currentSerials}</P>
          </div>
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
