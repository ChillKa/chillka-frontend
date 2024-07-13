'use client';

import { Activity } from '@action/activity';
import { useSearchProvider } from '@components/search/SearchBar/SearchProvider';
import { useSearchView } from '@components/search/SearchBar/SearchViewProvider';
import SearchMapSection from '@components/search/SearchMapSection';
import { useMemo } from 'react';

type ResultMapSectionProps = {
  activities?: Activity[];
};

const ResultMapSection = ({ activities = [] }: ResultMapSectionProps) => {
  const { isMobile = false } = useSearchProvider();
  const { currentShow, centerId } = useSearchView();
  const mapMarkers = useMemo(() => {
    const now = Date.now();

    return activities
      .filter(
        (currentResult): currentResult is Activity =>
          typeof currentResult.lat === 'number' &&
          typeof currentResult.lng === 'number' &&
          Array.isArray(currentResult.ticketPrice)
      )
      .map((activity) => {
        const nearestTicket =
          activity.ticketPrice.length > 0
            ? activity.ticketPrice.reduce<{
                name: string;
                price: number;
                startDateTime: string;
                endDateTime: string;
              }>((nearest, current) => {
                const currentDiff = Math.abs(
                  new Date(current.startDateTime).getTime() - now
                );
                const nearestDiff = Math.abs(
                  new Date(nearest.startDateTime).getTime() - now
                );
                return currentDiff < nearestDiff ? current : nearest;
              }, activity.ticketPrice[0])
            : null;

        return {
          lat: activity.lat,
          lng: activity.lng,
          id: activity._id,
          pricing: nearestTicket ? nearestTicket.price : 0,
        };
      });
  }, [activities]);

  return (
    <>
      {isMobile && currentShow === 'map' && (
        <div className="h-fit w-full">
          <SearchMapSection centerId={centerId} markers={mapMarkers} />
        </div>
      )}
      {!isMobile && (
        <div className="sticky top-0 h-fit w-full xl:max-w-[26rem]">
          <SearchMapSection centerId={centerId} markers={mapMarkers} />
        </div>
      )}
    </>
  );
};

export default ResultMapSection;
