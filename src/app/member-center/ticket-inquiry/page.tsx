'use client';

import {
  TicketsAPIResponse,
  TicketsInfoType,
  getTickets,
} from '@action/ticket';
import NoTicket from '@app/member-center/ticket-inquiry/NoTicket';
import QRCodePopUp from '@components/QRCodePopUp';
import SortOrder from '@components/SortOrder';
import TicketPopUp from '@components/TicketPopUp';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import useWindowSize from '@hooks/use-window-size';
import { useCallback, useEffect, useState } from 'react';

const TicketInquiry = () => {
  const [usableTickets, setUsableTickets] = useState<TicketsInfoType[]>([]);
  const [unusableTickets, setUnusableTickets] = useState<TicketsInfoType[]>([]);
  const [sort, setSort] = useState<string>('paymentDate');
  const { width } = useWindowSize();

  const changeSort = (value: string) => setSort(value);
  const handleSort = useCallback(
    (tickets: TicketsInfoType[]) => {
      return tickets.sort((a: TicketsInfoType, b: TicketsInfoType) => {
        switch (sort) {
          case 'paymentDate':
            return (
              new Date(b.ticket.createdAt).getTime() -
              new Date(a.ticket.createdAt).getTime()
            );
          case 'endTime':
            return (
              new Date(b.ticket.endDateTime).getTime() -
              new Date(a.ticket.endDateTime).getTime()
            );
          case 'paymentAmount':
            return b.ticket.price - a.ticket.price;
          default:
            return 0;
        }
      });
    },
    [sort]
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  useEffect(() => {
    setUsableTickets((prev) => handleSort([...prev]));
    setUnusableTickets((prev) => handleSort([...prev]));
  }, [sort, handleSort]);

  useEffect(() => {
    (async () => {
      const result: TicketsAPIResponse = await getTickets();
      if (result.status === 'failed' || !result.data) return;
      const usableTicketList = result.data.data
        .filter((ticket: TicketsInfoType) => ticket.orderStatus === '有效')
        .sort(
          (a: TicketsInfoType, b: TicketsInfoType) =>
            new Date(b.ticket.createdAt).getTime() -
            new Date(a.ticket.createdAt).getTime()
        );
      const unusableTicketList = result.data.data
        .filter((ticket: TicketsInfoType) => ticket.orderStatus === '無效')
        .sort(
          (a: TicketsInfoType, b: TicketsInfoType) =>
            new Date(b.ticket.createdAt).getTime() -
            new Date(a.ticket.createdAt).getTime()
        );
      setUsableTickets(usableTicketList);
      setUnusableTickets(unusableTicketList);
    })();
  }, []);

  return (
    <div className="relative text-primary">
      <div className="relative mb-6 h-[8.125rem] xl:flex xl:h-fit xl:items-center xl:justify-between">
        <h1 className="mb-8 text-5xl/none font-bold xl:mb-0">查詢票券</h1>
        <SortOrder
          className="absolute bottom-0 left-0 xl:static"
          state={sort}
          changeState={changeSort}
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
          {usableTickets.length > 0 ? (
            usableTickets.map((ticket: TicketsInfoType) => (
              <TicketPopUp key={ticket._id}>
                <div className="block grid-cols-[7fr_2fr_2fr_2fr] py-4 text-xl font-bold xl:grid">
                  <h3 className="mb-[1.25rem] text-left xl:mb-0 xl:font-bold">
                    {ticket.ticket.name}
                  </h3>
                  <p className="mr-2 inline-block bg-primary px-2 py-1 text-xs/5 font-medium text-white xl:mr-0 xl:flex xl:items-center xl:justify-center xl:bg-surface xl:p-0 xl:text-xl xl:font-bold xl:text-primary">
                    {width > 1366
                      ? ticket.payment.orderNumber
                      : `數量：${ticket.payment.orderNumber}`}
                  </p>
                  <p className="inline-block bg-primary px-2 py-1 text-xs/5 font-medium text-white xl:flex xl:items-center xl:justify-center xl:bg-surface xl:p-0 xl:text-xl xl:font-bold xl:text-primary">
                    {width > 1366
                      ? formatDate(ticket.ticket.endDateTime)
                      : `使用期限：${formatDate(ticket.ticket.endDateTime)}`}
                  </p>
                  <div className="xl:flex xl:items-center xl:justify-center">
                    <QRCodePopUp
                      name={ticket.orderContact.name}
                      startTime={ticket.ticket.startDateTime}
                      endTime={ticket.ticket.endDateTime}
                      id={ticket.ticket._id}
                    />
                  </div>
                </div>
              </TicketPopUp>
            ))
          ) : (
            <NoTicket />
          )}
        </TabsContent>
        <TabsContent value="unusableTicket">
          {unusableTickets.length > 0 ? (
            unusableTickets.map((ticket: TicketsInfoType) => (
              <TicketPopUp key={ticket._id}>
                <div className="block grid-cols-[7fr_2fr_2fr_2fr] py-4 text-xl font-bold xl:grid">
                  <h3 className="mb-[1.25rem] text-left xl:mb-0 xl:font-bold">
                    {ticket.ticket.name}
                  </h3>
                  <p className="mr-2 inline-block bg-primary px-2 py-1 text-xs/5 font-medium text-white xl:mr-0 xl:flex xl:items-center xl:justify-center xl:bg-surface xl:p-0 xl:text-xl xl:font-bold xl:text-primary">
                    {width > 1366
                      ? ticket.payment.orderNumber
                      : `數量：${ticket.payment.orderNumber}`}
                  </p>
                  <p className="inline-block bg-primary px-2 py-1 text-xs/5 font-medium text-white xl:flex xl:items-center xl:justify-center xl:bg-surface xl:p-0 xl:text-xl xl:font-bold xl:text-primary">
                    {width > 1366
                      ? formatDate(ticket.ticket.endDateTime)
                      : `使用期限：${formatDate(ticket.ticket.endDateTime)}`}
                  </p>
                  <div className="xl:flex xl:items-center xl:justify-center">
                    <QRCodePopUp
                      name={ticket.orderContact.name}
                      startTime={ticket.ticket.startDateTime}
                      endTime={ticket.ticket.endDateTime}
                      id={ticket.ticket._id}
                    />
                  </div>
                </div>
              </TicketPopUp>
            ))
          ) : (
            <NoTicket />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TicketInquiry;
