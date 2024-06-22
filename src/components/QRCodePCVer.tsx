import Image from 'next/image';

type QRCodePCVerProps = {
  closeQRCode: () => void;
};

const qrcode = '/qrcode.png';

const QRCodePCVer = ({ closeQRCode }: QRCodePCVerProps) => {
  return (
    <div className="relative">
      <div className="fixed left-0 top-0 flex h-svh w-svw items-center justify-center bg-black/[0.7]">
        <div className="relative h-[44.25rem] w-[26rem] bg-surface px-6 pb-6 pt-12">
          <button
            className="absolute right-0 top-0 h-[2.375rem] w-[2.375rem] bg-primary text-2xl text-white"
            type="button"
            onClick={closeQRCode}
          >
            x
          </button>
          <Image width={368} height={368} src={qrcode} alt="qrcode" />
        </div>
      </div>
    </div>
  );
};

export default QRCodePCVer;
