'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
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
      <div className="mb-6 flex w-full flex-row justify-between">
        <TabsList className="grid w-[50%] grid-cols-2">
          <TabsTrigger value="table">參加者名單</TabsTrigger>
          <TabsTrigger value="report">報表</TabsTrigger>
        </TabsList>
        <QRCodeScannerDialogButton
          onScanSuccess={handleScanSuccess}
          name="檢驗票券"
        />
      </div>
      <TabsContent value="table" asChild>
        <ManagementActivityTable orders={orders} />
      </TabsContent>
      <TabsContent value="report" />
    </Tabs>
  );
};

export default ManagementActivitySection;
