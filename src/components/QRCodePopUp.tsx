import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import useWindowSize from '@hooks/use-window-size';
import { ArrowRight, QrCode, X } from 'lucide-react';
import Image from 'next/image';

type QRCodePCVerProps = {
  state: boolean;
  index: number;
  changeQRCode: (index: number) => void;
};

const qrcode = '/qrcode.png';

const QRCodePopUp = ({ index, state, changeQRCode }: QRCodePCVerProps) => {
  const { width } = useWindowSize();

  return (
    <Dialog open={state} onOpenChange={() => changeQRCode(index)}>
      <DialogTrigger>
        {width > 1366 ? (
          <QrCode size={40} />
        ) : (
          <div className="mt-4 flex w-fit items-center justify-center border border-black px-6 py-4  text-base font-medium">
            <QrCode size={16} />
            <p className="ml-4">使用票券</p>
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="h-[44.25rem] w-[26rem]" hideCloseButton>
        <button
          className="absolute right-0 top-0 bg-primary p-[0.625rem]"
          onClick={() => changeQRCode(index)}
          aria-label="QRCode"
          type="button"
        >
          <X className="stroke-white" size={24} />
        </button>
        <div className="px-6 pb-6 pt-12">
          <DialogTitle className="mb-6">票券可使用時間</DialogTitle>
          <div className="mb-6 flex items-center justify-center">
            <div className="flex-1">
              <p className="mb-2 text-3xl font-bold">00:00</p>
              <p className="text-sm/7">2024.01.10</p>
            </div>
            <ArrowRight className="mx-6" size={24} />
            <div className="flex-1">
              <p className="mb-2 text-3xl font-bold">00:00</p>
              <p className="text-sm/7">2024.01.10</p>
            </div>
          </div>
          <Image src={qrcode} width={368} height={368} alt="QRCode" />
          <div className="my-6 h-1 w-full border-t border-dashed border-black" />
          <p className="m-auto py-4 text-center">參加人：ZIM</p>
        </div>
        <DialogFooter className="flex h-[1.875rem] items-center justify-center bg-primary text-sm text-white">
          票券編號：2403280558401308152642
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodePopUp;
