'use client';

import NoTicket from '@app/member-center/ticket-inquiry/NoTicket';
import QRCodePopUp from '@components/QRCodePopUp';
import SortOrder from '@components/SortOrder';
import TicketPopUp from '@components/TicketPopUp';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import useWindowSize from '@hooks/use-window-size';
import { useState } from 'react';
import fakerData from './fakerData';

const TicketInquiry = () => {
  const [sort, setSort] = useState('1');
  const { width } = useWindowSize();

  const handleSort = (value: string) => setSort(value);

  return (
    <div className="relative text-primary">
      <div className="relative mb-6 h-[8.125rem] xl:flex xl:h-fit xl:items-center xl:justify-between">
        <h1 className="mb-8 text-5xl/none font-bold xl:mb-0">查詢票券</h1>
        <SortOrder
          className="absolute bottom-0 left-0 xl:static"
          state={sort}
          changeState={handleSort}
        />
      </div>
      <Tabs defaultValue="usableTicket">
        <TabsList className="h-fit w-full justify-start border-b-[0.0625rem] bg-surface p-0 xl:border-b-0">
          <TabsTrigger
            className="mr-6 bg-surface px-0 py-6 text-xl font-bold text-primary data-[state=active]:border-b-4 data-[state=active]:pb-5 data-[state=active]:text-primary"
            value="usableTicket"
          >
            可使用
          </TabsTrigger>
          <TabsTrigger
            className="bg-surface px-0 py-6 text-xl font-bold text-primary data-[state=active]:border-b-4 data-[state=active]:pb-5 data-[state=active]:text-primary"
            value="unusableTicket"
          >
            已使用或過期
          </TabsTrigger>
        </TabsList>
        <ul className="hidden grid-cols-[7fr_2fr_2fr_2fr] border-y-[0.0625rem] py-4 text-xl font-bold xl:grid">
          <li className="text-left">活動名稱</li>
          <li className="text-center">數量</li>
          <li className="text-center">使用期限</li>
          <li className="text-center">開啟票券</li>
        </ul>
        <TabsContent value="usableTicket">
          {fakerData.map((ticker) => {
            return (
              <TicketPopUp key={ticker.orderNumber}>
                <div className="block grid-cols-[7fr_2fr_2fr_2fr] py-4 text-xl font-bold xl:grid">
                  <h3 className="mb-[1.25rem] text-left xl:mb-0 xl:font-bold">
                    {ticker.title}
                  </h3>
                  <p className="mr-2 inline-block bg-primary px-2 py-1 text-xs/5 font-medium text-white xl:mr-0 xl:flex xl:items-center xl:justify-center xl:bg-surface xl:p-0 xl:text-xl xl:font-bold xl:text-primary">
                    {width > 1366
                      ? ticker.quantity
                      : `數量：${ticker.quantity}`}
                  </p>
                  <p className="inline-block bg-primary px-2 py-1 text-xs/5 font-medium text-white xl:flex xl:items-center xl:justify-center xl:bg-surface xl:p-0 xl:text-xl xl:font-bold xl:text-primary">
                    {width > 1366
                      ? ticker.expirationDate
                      : `使用期限：${ticker.expirationDate}`}
                  </p>
                  <div className="xl:flex xl:items-center xl:justify-center">
                    <QRCodePopUp />
                  </div>
                </div>
              </TicketPopUp>
            );
          })}
        </TabsContent>
        <TabsContent value="unusableTicket">
          <NoTicket />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TicketInquiry;
