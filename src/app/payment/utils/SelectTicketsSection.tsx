'use client';

import OrganizerName from '@components/ActivityPage/OrganizerSection/OrganizerName';
import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { H3, H4 } from '@components/ui/typography';
import { formatActivityTime } from '@lib/dateUtils';
import cn from '@lib/utils';
import {
  CalendarDays,
  MapPin,
  MinusCircle,
  PlusCircle,
  User,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IAcitivityResponse } from 'src/types/activity';

type SelectTicketsSectionProps = {
  activityId: string;
  data: IAcitivityResponse;
};

const SelectTicketsSection = ({
  activityId,
  data,
}: SelectTicketsSectionProps) => {
  const router = useRouter();
  const [selectedTickets, setSelectedTickets] = useState<{
    [key: string]: number;
  }>({});

  const handleTicketChange = (ticketId: string, change: number) => {
    setSelectedTickets((prev) => {
      const newCount = Math.max(0, (prev[ticketId] || 0) + change);
      return { ...prev, [ticketId]: newCount };
    });
  };

  const totalAmount = data.tickets.reduce((total, ticket) => {
    return total + (selectedTickets[ticket._id] || 0) * ticket.price;
  }, 0);

  const handleNextStep = () => {
    const searchParams = new URLSearchParams();
    Object.entries(selectedTickets).forEach(([ticketId, quantity]) => {
      if (quantity > 0) {
        searchParams.append(`ticket_${ticketId}`, quantity.toString());
      }
    });
    searchParams.append('totalAmount', totalAmount.toString());

    router.push(`/payment/${activityId}/fill-info?${searchParams.toString()}`);
  };

  return (
    <>
      <section
        id="ticket-info-section"
        className={cn(
          'fixed bottom-0 h-fit w-full bg-surface xl:relative xl:max-w-[26rem]',
          'bg-surface text-primary transition-opacity',
          'z-10 space-y-4 border-t border-primary px-3 py-4 xl:border xl:px-8 xl:py-6',
          'xl:sticky xl:top-12'
        )}
      >
        <OrganizerName className="" data={data} />
        <H3>{data.activity.name}</H3>
        <div className="space-y-2">
          <div className="flex items-center">
            <CalendarDays />
            <div className="ml-4 text-base font-medium">
              {formatActivityTime(
                data.activity.startDateTime,
                data.activity.endDateTime,
                data.activity.noEndDate
              )}
            </div>
          </div>
          <div className="flex items-center">
            <MapPin />
            <div className="ml-4 text-base font-medium">
              {data.activity.type === '線上' ? (
                `${data.activity.type}活動`
              ) : (
                <div>
                  {data.activity.address}
                  <br />
                  {data.activity.location}
                </div>
              )}
            </div>
          </div>
          {!data.activity.unlimitedQuantity && (
            <div className="flex items-center">
              <User />
              <div className="ml-4 text-base font-medium">
                {data.activity.totalParticipantCapacity}人
                {data.activity.displayRemainingTickets &&
                  `（剩餘名額：${data.activity.remainingTickets}）`}
              </div>
            </div>
          )}
        </div>
      </section>
      <section id="ticket-section" className="flex flex-col gap-2">
        <div className="mb-2 flex flex-row items-center justify-between">
          <H4>請選擇票券</H4>
          <div className="flex flex-row items-center gap-2">
            <div id="total-amount">Total: ${totalAmount}</div>
            <Button variant="default" onClick={handleNextStep}>
              下一步
            </Button>
          </div>
        </div>
        {data.tickets.map((ticket) => {
          return (
            <Card
              key={ticket._id}
              id="ticket"
              className="flex w-full flex-row items-center justify-between gap-3 rounded-xl p-1"
            >
              <div className="flex max-w-[70%] flex-col gap-2">
                <H4>{ticket.name}</H4>
                <p>
                  {ticket.startDateTime} 至 {ticket.endDateTime}
                </p>
                <p>{ticket.description}</p>
              </div>
              <div className="mr-2 flex flex-row gap-2">
                <div>NTD$ ${ticket.price}</div>
                <div id="ticket-select-number" className="flex flex-row">
                  <MinusCircle
                    className="cursor-pointer"
                    onClick={() => handleTicketChange(ticket._id, -1)}
                  />
                  <span className="mx-2">
                    {selectedTickets[ticket._id] || 0}
                  </span>
                  <PlusCircle
                    className="cursor-pointer"
                    onClick={() => handleTicketChange(ticket._id, 1)}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </section>
    </>
  );
};

export default SelectTicketsSection;
