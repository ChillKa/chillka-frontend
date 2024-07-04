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
  // TODO: use route handler to call the method to call api
  const handleScanSuccess = (result: string) => {
    console.log('The result is ', result);
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
