'use client';

import OrganizerName from '@components/AcitivyPage/OrganizerSection/OrganizerName';
import FavoriteButton from '@components/AcitivyPage/TicketSection/FavoriteButton';
import SignUpButton from '@components/AcitivyPage/TicketSection/SignUpButton';
import { H3 } from '@components/ui/typography';
import useMediaQuery from '@hooks/use-media-query';
import { formatActivityTime } from '@lib/dateUtils';
import cn from '@lib/utils';
import { CalendarDays, MapPin, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { IAcitivityResponse } from 'src/types/activity';

type TicketSectionProps = {
  className: string;
  data: IAcitivityResponse;
};

const TicketSection = ({ className, data }: TicketSectionProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const { matches: isMobile } = useMediaQuery();

  useEffect(() => {
    if (!isMobile) return setIsVisible(true);

    const handleScroll = () => {
      setIsVisible(false);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        setIsVisible(true);
      }, 200);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [isMobile]);

  return (
    <section
      className={cn(
        'fixed bottom-0 h-fit w-full bg-surface xl:relative xl:max-w-[26rem]',
        'bg-surface text-primary transition-opacity',
        'z-10 space-y-4 border-t border-primary px-3 py-4 xl:border xl:px-8 xl:py-6',
        'xl:sticky xl:top-12',
        `${isVisible ? 'opacity-100' : 'opacity-0'}`,
        className
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
      <div className="mt-4 flex xl:mt-0">
        <SignUpButton className="" data={data} />
        <FavoriteButton className="" activityId={data.activity._id} />
      </div>
    </section>
  );
};

export default TicketSection;
