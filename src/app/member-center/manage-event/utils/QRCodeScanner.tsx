'use client';

import {
  Html5QrcodeScanner,
  QrcodeErrorCallback,
  QrcodeSuccessCallback,
} from 'html5-qrcode';
import { useCallback, useEffect } from 'react';
import './QRCodeScanner.css';

export type QRCodeScannerProps = {
  onScanSuccess: (result: string) => void;
  onScanError?: (error: string) => void;
};

const QRCodeScanner = ({ onScanSuccess, onScanError }: QRCodeScannerProps) => {
  const handleScanSuccess: QrcodeSuccessCallback = useCallback(
    (decodedText) => {
      onScanSuccess(decodedText);
    },
    [onScanSuccess]
  );

  const handleScanError: QrcodeErrorCallback = useCallback(
    (error) => {
      onScanError?.(error);
    },
    [onScanError]
  );

  useEffect(() => {
    const html5QRcodeScanner = new Html5QrcodeScanner(
      'reader',
      { fps: 10, qrbox: 250 },
      false
    );
    html5QRcodeScanner.render(handleScanSuccess, handleScanError);

    return () => {
      html5QRcodeScanner.clear().catch((error) => {
        onScanError?.(error);
      });
    };
  }, [handleScanError, handleScanSuccess, onScanError]);

  return <div id="reader" />;
};

export default QRCodeScanner;
