import { Button } from '@components/ui/button';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useRef, useState } from 'react';

type QRCodeScannerButtonProps = {
  name: string;
  onScanSuccess: (result: string) => void;
};

const QRCodeScannerButton = ({
  name,
  onScanSuccess,
}: QRCodeScannerButtonProps) => {
  const [showScanner, setShowScanner] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, []);

  const handleScanSuccess = (decodedText: string, decodedResult: any) => {
    console.log(decodedText, decodedResult);
    onScanSuccess(decodedText);
    if (scannerRef.current) {
      scannerRef.current.clear();
    }
    setShowScanner(false);
  };

  const handleScanError = (error: any) => {
    console.warn(`Code scan error = ${error}`);
  };

  const startScanner = () => {
    setShowScanner(true);
    if (!scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        'render',
        { fps: 10, qrbox: 250 },
        false
      );
    }
    scannerRef.current.render(handleScanSuccess, handleScanError);
  };

  return (
    <>
      <Button variant="default" onClick={startScanner}>
        {name}
      </Button>
      {showScanner && <div id="reader" className="mt-4" />}
    </>
  );
};

export default QRCodeScannerButton;
