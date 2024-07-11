'use client';

import OrganizerName from '@components/ActivityPage/OrganizerSection/OrganizerName';
import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { H3, Lead, P } from '@components/ui/typography';
import { formatActivityTime, formatTicketTime } from '@lib/dateUtils';
import { formatPrice } from '@lib/fomatPrice';
import cn from '@lib/utils';
import { CalendarDays, MapPin, Minus, Plus, User } from 'lucide-react';
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
      const ticket = data.tickets.find((t) => t._id === ticketId);
      if (!ticket) return prev;

      const currentCount = prev[ticketId] || 0;
      const newCount = Math.max(
        0,
        Math.min(currentCount + change, ticket.purchaseLimit)
      );

      if (newCount === 0) {
        const { [ticketId]: _, ...rest } = prev;
        return rest;
      }
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

  const isAnyTicketSelected = Object.values(selectedTickets).some(
    (quantity) => quantity > 0
  );
  const isNextStepDisabled = Object.keys(selectedTickets).every(
    (ticketId) => selectedTickets[ticketId] === 0
  );

  return (
    <>
      <section
        id="ticket-info-section"
        className={cn(
          'fixed bottom-0 left-0 h-fit w-full bg-surface xl:relative xl:max-w-[26rem]',
          'bg-surface text-primary transition-opacity',
          'z-10 space-y-4 border-t border-primary px-3 py-4 xl:border xl:px-8 xl:py-6',
          'xl:sticky xl:top-12',
          'xl:mr-20'
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
      <section
        id="ticket-section"
        className="flex w-full flex-col gap-6 text-primary"
      >
        <div className="flex flex-row items-center justify-between">
          <H3>請選擇票券</H3>
          <div className="flex flex-row items-center gap-4">
            <Lead id="total-amount">Total: ${formatPrice(totalAmount)}</Lead>
            <Button
              variant="default"
              onClick={handleNextStep}
              disabled={isNextStepDisabled}
            >
              下一步
            </Button>
          </div>
        </div>
        {data.tickets.map((ticket) => {
          const isDisabled =
            isAnyTicketSelected && !selectedTickets[ticket._id];
          const remainingTickets =
            ticket.participantCapacity - ticket.soldNumber;
          const canIncrease =
            (selectedTickets[ticket._id] || 0) <
            Math.min(ticket.purchaseLimit, remainingTickets);

          const canDecrease = (selectedTickets[ticket._id] || 0) > 0;

          return (
            <Card
              key={ticket._id}
              id="ticket"
              className={cn(
                'flex w-full flex-row items-center justify-between gap-3 bg-transparent p-4 text-primary',
                isDisabled && 'bg-gray-200 opacity-50'
              )}
            >
              <div className="flex max-w-[70%] flex-col gap-2">
                <H3>{ticket.name}</H3>
                <P>
                  {formatTicketTime(
                    ticket.startDateTime,
                    ticket.endDateTime,
                    ticket.noEndDate
                  )}
                </P>
                <p>{ticket.description}</p>
                <p>
                  剩餘票數: {remainingTickets} / 每人限購:{' '}
                  {ticket.purchaseLimit} 張
                </p>
              </div>
              <div className="flex flex-row gap-2">
                <Lead className="leading-8">
                  NT${formatPrice(ticket.price)}
                </Lead>
                <div
                  id="ticket-select-number"
                  className="flex flex-row items-center"
                >
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      'w-fit cursor-pointer hover:bg-surface',
                      !canDecrease && 'opacity-50'
                    )}
                    onClick={() =>
                      canDecrease && handleTicketChange(ticket._id, -1)
                    }
                  >
                    <Minus size={32} />
                  </Button>
                  <Lead className="mx-2 font-medium">
                    {selectedTickets[ticket._id] || 0}
                  </Lead>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      'w-fit cursor-pointer hover:bg-surface',
                      !canIncrease && 'opacity-50'
                    )}
                    onClick={() =>
                      canIncrease && handleTicketChange(ticket._id, 1)
                    }
                  >
                    <Plus size={32} />
                  </Button>
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
