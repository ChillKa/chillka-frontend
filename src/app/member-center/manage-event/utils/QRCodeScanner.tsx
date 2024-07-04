'use client';

import {
  Html5QrcodeScanner,
  QrcodeErrorCallback,
  QrcodeSuccessCallback,
} from 'html5-qrcode';
import { useEffect } from 'react';

export type QRCodeScannerProps = {
  onScanSuccess: (result: string) => void;
};

const QRCodeScanner = ({ onScanSuccess }: QRCodeScannerProps) => {
  const handleScanSuccess: QrcodeSuccessCallback = (decodedText) => {
    onScanSuccess(decodedText);
  };

  const handleScanError: QrcodeErrorCallback = (error) => {
    console.warn(`Code scan error = ${error}`);
  };

  useEffect(() => {
    const html5QRcodeScanner = new Html5QrcodeScanner(
      'reader',
      { fps: 10, qrbox: 250 },
      false
    );
    html5QRcodeScanner.render(handleScanSuccess, handleScanError);

    return () => {
      html5QRcodeScanner.clear().catch((error) => {
        console.error('Failed to clear, ', error);
      });
    };
  }, [handleScanSuccess]);

  return <div id="reader" />;
};

export default QRCodeScanner;
