'use client';

import { Separator } from '@components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import ManagementActivityReport from './ManagementActivityReport';
import ManagementActivityTable from './ManagementActivityTable';
import QRCodeScannerDialogButton, {
  QRCodeScannerDialogButtonProps,
} from './QRCodeScannerDialogButton';
import { Order } from './types';

type ManagementActivitySectionProps = {
  orders: Order[];
};

const ManagementActivitySection = ({
  orders,
}: ManagementActivitySectionProps) => {
  const handleScanSuccess: QRCodeScannerDialogButtonProps['onScanSuccess'] =
    async (result: string) => {
      try {
        const response = await fetch(`/api/qrcode/${result}`);
        const data = await response.json();

        if (data.status === 'failed') {
          return { status: 'fail', message: data.message || '發生未知錯誤' };
        }

        return { status: 'success', message: data.message || '成功註冊' };
      } catch (error) {
        return { status: 'fail', message: '網絡錯誤，請稍後再試' };
      }
    };

  return (
    <Tabs defaultValue="table" className="w-full">
      <div className="mb-6 flex w-full max-w-full flex-col justify-between xl:flex-row">
        <TabsList className="mb-4 grid max-w-full grid-cols-2 bg-primary text-white xl:mb-0 xl:w-[50%]">
          <TabsTrigger
            value="table"
            className="data-[state=active]:text-primary"
          >
            參加者名單
          </TabsTrigger>
          <TabsTrigger
            value="report"
            className="data-[state=active]:text-primary"
          >
            報表
          </TabsTrigger>
        </TabsList>
        <QRCodeScannerDialogButton
          onScanSuccess={handleScanSuccess}
          name="檢驗票券"
        />
      </div>
      <Separator className="my-8 h-[0.3px]" />
      <div className="w-full overflow-x-auto xl:overflow-x-visible">
        <TabsContent className="min-w-[37.5rem]" value="table" asChild>
          <ManagementActivityTable orders={orders} />
        </TabsContent>
        <TabsContent className="min-w-[37.5rem]" value="report" asChild>
          <ManagementActivityReport orders={orders} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ManagementActivitySection;
