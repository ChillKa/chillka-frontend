'use client';

import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';

type QRCodeScannerProps = {
  onScanSuccess: (result: string) => void;
};

const QRCodeScanner = ({ onScanSuccess }: QRCodeScannerProps) => {
  const handleScanSuccess = (decodedText: string, decodedResult: any) => {
    console.log(decodedText, decodedResult);
    onScanSuccess(decodedText);
  };

  const handleScanError = (error: any) => {
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
  }, []);

  return <div id="reader" />;
};

export default QRCodeScanner;
