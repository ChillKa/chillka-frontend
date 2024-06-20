'use client';

import OrganizerName from '@components/AcitivyPage/OrganizerSection/OrganizerName';
import FavoriteButton from '@components/AcitivyPage/TicketSection/FavoriteButton';
import SignUpButton from '@components/AcitivyPage/TicketSection/SignUpButton';
import { H3 } from '@components/ui/typography';
import useMediaQuery from '@hooks/use-media-query';
import cn from '@lib/utils';
import { CalendarDays, MapPin, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type TicketSectionProps = {
  className: string;
  organizer: string;
  profilePicture: string;
  name: string;
  type: string;
  unlimitedQuantity: boolean;
  participantCapacity: number;
};

const TicketSection = ({
  className,
  organizer,
  profilePicture,
  name,
  type,
  unlimitedQuantity,
  participantCapacity,
  // dataTime
}: TicketSectionProps) => {
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
      <OrganizerName
        className=""
        profilePicture={profilePicture}
        organizer={organizer}
      />
      <H3>{name}</H3>
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
          <div className="ml-4 text-base font-medium">{type}活動</div>
        </div>
        {!unlimitedQuantity && (
          <div className="flex items-center">
            <User />
            <div className="ml-4 text-base font-medium">
              {participantCapacity}人
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 flex xl:mt-0">
        <SignUpButton
          className=""
          isSignedUp={false}
          participantCapacity={participantCapacity}
        />
        <FavoriteButton className="" isFavorited={false} />
      </div>
    </section>
  );
};

export default TicketSection;
