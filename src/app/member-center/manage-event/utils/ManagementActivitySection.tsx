'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import ManagementActivityTable from './ManagementActivityTable';
import QRCodeScannerDialogButton from './QRCodeScannerDialogButton';
import { Order } from './types';

type ManagementActivitySectionProps = {
  orders: Order[];
};

const ManagementActivitySection = ({
  orders,
}: ManagementActivitySectionProps) => {
  const handleScanSuccess = async (result: string) => {
    try {
      const response = await fetch(`/api/qrcode/${result}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '發生錯誤');
      }

      const data = await response.json();
      console.log('API 回應:', data);
    } catch (error) {
      console.error('API 呼叫失敗:', error);
      throw error;
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
