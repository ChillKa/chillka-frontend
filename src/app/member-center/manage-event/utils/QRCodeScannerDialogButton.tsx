'use client';

import { Button } from '@components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { H3, P } from '@components/ui/typography';
import { useState } from 'react';
import QRCodeScanner, { QRCodeScannerProps } from './QRCodeScanner';

type QRCodeScannerButtonProps = {
  name: string;
  onScanSuccess: (result: string) => void;
};

const QRCodeScannerDialogButton = ({
  name,
  onScanSuccess,
}: QRCodeScannerButtonProps) => {
  const [currentSerials, setCurrentSerials] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState<{
    status: string;
    message: string;
  } | null>(null);

  const handleScanSuccess: QRCodeScannerProps['onScanSuccess'] = async (
    result
  ) => {
    setCurrentSerials(result);
    setIsLoading(true);
    setScanResult(null);
    try {
      await onScanSuccess(result);
      setScanResult({ status: 'success', message: '成功註冊' });
    } catch {
      setScanResult({ status: 'failed', message: '發生錯誤' });
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="my-4 flex w-full flex-col items-center justify-start gap-4">
          <H3 asChild className="mb-4">
            <div>掃描QR Code以使用票券</div>
          </H3>
          <div>
            <P>序號: {currentSerials}</P>
          </div>
          <div>
            <Input
              variant="form"
              placeholder="輸入序號"
              onBlur={(e) => {
                setCurrentSerials(e.currentTarget.value);
              }}
            />
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
