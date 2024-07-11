'use client';

import OrganizerName from '@components/ActivityPage/OrganizerSection/OrganizerName';
import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { H3, Lead, P, Small } from '@components/ui/typography';
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

  const handleReset = () => {
    setSelectedTickets({});
  };

  const isNextStepDisabled = Object.keys(selectedTickets).length === 0;

  const isDisabled = (ticketId: string) => {
    return (
      Object.keys(selectedTickets).length > 0 && !selectedTickets[ticketId]
    );
  };

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
          <div className="flex items-center gap-4">
            <H3>請選擇票券</H3>
            {Object.keys(selectedTickets).length > 0 && (
              <Button variant="default" onClick={handleReset}>
                重新選擇
              </Button>
            )}
          </div>
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
          const currentCount = selectedTickets[ticket._id] || 0;
          const remainingTickets =
            ticket.participantCapacity - ticket.soldNumber;
          const canIncrease =
            currentCount < Math.min(ticket.purchaseLimit, remainingTickets);
          const canDecrease = currentCount > 0;
          const disabled = isDisabled(ticket._id);

          return (
            <Card
              key={ticket._id}
              id="ticket"
              className={cn(
                'flex w-full flex-row items-center justify-between gap-3 bg-transparent p-4 text-primary',
                disabled && 'bg-gray-200 opacity-40'
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
                <P>{ticket.description}</P>
                <Small className="mt-2 font-semibold">
                  剩餘票數：{remainingTickets} / 每人限購：
                  {ticket.purchaseLimit} 張
                </Small>
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
                      'h-8 w-8 border-primary px-2 text-3xl text-primary xl:h-10 xl:w-10',
                      'cursor-pointer transition-colors hover:bg-primary hover:fill-surface hover:text-surface',
                      (!canDecrease || disabled) &&
                        'cursor-not-allowed opacity-50'
                    )}
                    onClick={() =>
                      canDecrease && handleTicketChange(ticket._id, -1)
                    }
                    disabled={!canDecrease || disabled}
                  >
                    <Minus />
                  </Button>
                  <Lead className="mx-2 font-medium">
                    {selectedTickets[ticket._id] || 0}
                  </Lead>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      'h-8 w-8 border-primary px-2 text-3xl text-primary xl:h-10 xl:w-10',
                      'cursor-pointer transition-colors hover:bg-primary hover:fill-surface hover:text-surface',
                      (!canIncrease || disabled) &&
                        'cursor-not-allowed opacity-50'
                    )}
                    onClick={() =>
                      canIncrease && handleTicketChange(ticket._id, 1)
                    }
                    disabled={!canIncrease || disabled}
                  >
                    <Plus />
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
