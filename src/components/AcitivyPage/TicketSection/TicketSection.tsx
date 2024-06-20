'use client';

import OrganizerName from '@components/AcitivyPage/OrganizerSection/OrganizerName';
import FavoriteButton from '@components/AcitivyPage/TicketSection/FavoriteButton';
import SignUpButton from '@components/AcitivyPage/TicketSection/SignUpButton';
import { H3 } from '@components/ui/typography';
import useMediaQuery from '@hooks/use-media-query';
import cn from '@lib/utils';
import { useActivityContext } from '@store/ActivityProvider/ActivityProvider';
import { CalendarDays, MapPin, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type TicketSectionProps = {
  className: string;
};

const TicketSection = ({ className }: TicketSectionProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const { matches: isMobile } = useMediaQuery();
  const { data } = useActivityContext();

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

  if (!data) {
    return null;
  }

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
      <OrganizerName className="" />
      <H3>{data.activity.name}</H3>
      <div className="space-y-2">
        <div className="flex items-center">
          <CalendarDays />
          <div className="ml-4 text-base font-medium">
            {/* date time */}
            2024-08-15(日)10:00 至 12:00
          </div>
        </div>
        <div className="flex items-center">
          <MapPin />
          <div className="ml-4 text-base font-medium">
            {data.activity.type}活動
          </div>
        </div>
        {!data.activity.unlimitedQuantity && (
          <div className="flex items-center">
            <User />
            <div className="ml-4 text-base font-medium">
              {data.activity.participantCapacity}人
              {data.activity.displayRemainingTickets &&
                `（剩餘名額：${data.activity.remainingTickets}）`}
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 flex xl:mt-0">
        <SignUpButton className="" />
        <FavoriteButton className="" />
      </div>
    </section>
  );
};

export default TicketSection;
