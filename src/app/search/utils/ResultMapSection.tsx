'use client';

import { Activity } from '@action/activity';
import WithErrorBoundaryAndSuspense from '@components/hoc/WithErrorBoundaryAndSuspense';
import SearchMapSection from '@components/search/SearchMapSection';
import { Skeleton } from '@components/ui/skeleton';
import { useMemo } from 'react';

type ResultMapSectionProps = {
  activities?: Activity[];
  centerId?: string;
  currentShow?: 'map' | 'results';
  isMobile?: boolean;
};

const ResultMapSection = ({
  activities = [],
  centerId,
  currentShow,
  isMobile = false,
}: ResultMapSectionProps) => {
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
    <WithErrorBoundaryAndSuspense
      loadingFallback={
        <div className="h-[400px] w-full space-y-2">
          <Skeleton className="h-full w-full rounded-lg" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[60px]" />
          </div>
          <Skeleton className="h-4 w-[80%]" />
        </div>
      }
    >
      {isMobile && currentShow === 'map' && (
        <div className="h-fit w-full">
          <SearchMapSection centerId={centerId} markers={mapMarkers} />
        </div>
      )}
      {!isMobile && (
        <div className="sticky top-0 h-fit w-full max-w-[26rem]">
          <SearchMapSection centerId={centerId} markers={mapMarkers} />
        </div>
      )}
    </WithErrorBoundaryAndSuspense>
  );
};

export default ResultMapSection;
