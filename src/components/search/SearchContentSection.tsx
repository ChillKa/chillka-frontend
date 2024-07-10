'use client';

import { Activity } from '@action/activity';
import {
  IntersectionObserverEventCard,
  SearchResultEventCard,
} from '@components/EventCard';
import useMediaQuery from '@hooks/use-media-query';
import { useSearchParams } from 'next/navigation';
import { H4 } from '../ui/typography';

export type SearchContentSectionProps = {
  results: Activity[];
  currentShow: 'results' | 'map';
  setCenterId: (id: string) => void;
  total?: number;
};
const SearchContentSection = ({
  results,
  currentShow,
  setCenterId,
  total = 0,
}: SearchContentSectionProps) => {
  const { matches: isMobile } = useMediaQuery();
  const searchParams = useSearchParams();

  const keyword = searchParams.get('keyword');

  if (currentShow !== 'results') {
    return null;
  }

  return (
    <>
      <div
        id="result-keyword"
        className="flex w-full items-center justify-start"
      >
        <H4>
          「{keyword}」找到{total}個活動
        </H4>
      </div>
      {results.map((activity) => {
        return isMobile ? (
          <IntersectionObserverEventCard
            key={activity._id}
            link={activity._id}
            title={activity.name}
            cover={activity.thumbnail}
            description={activity.details}
            startTime={activity.startDateTime}
            endTime={activity.endDateTime}
            attendeeCount={
              activity?.totalParticipantCapacity != null &&
              activity?.remainingTickets != null &&
              !Number.isNaN(
                activity.totalParticipantCapacity - activity.remainingTickets
              )
                ? activity.totalParticipantCapacity - activity.remainingTickets
                : 0
            }
            isCollected={activity.isCollected}
            location={activity?.type === '線下' ? activity?.address : '線上'}
            organizer={activity.organizer?.contactName ?? '未知舉辦者'} // FIXME: Wait for backend fixed data
            ticketPrices={activity?.ticketPrice ?? []}
            isContinuous={activity.isContinuous}
            discount={0}
            className="h-auto gap-4"
            onVisibleTrigger={() => {
              setCenterId(activity._id);
            }}
          />
        ) : (
          <SearchResultEventCard
            key={activity._id}
            link={activity._id}
            title={activity.name}
            cover={activity.thumbnail}
            summary={activity.summary}
            startTime={activity.startDateTime}
            endTime={activity.endDateTime}
            attendeeCount={
              activity?.totalParticipantCapacity != null &&
              activity?.remainingTickets != null &&
              !Number.isNaN(
                activity.totalParticipantCapacity - activity.remainingTickets
              )
                ? activity.totalParticipantCapacity - activity.remainingTickets
                : 0
            }
            isCollected={activity.isCollected}
            location={activity?.type === '線下' ? activity?.location : '線上'}
            organizer={activity.organizer?.contactName ?? '未知舉辦者'} // FIXME: Wait for backend fixed data
            ticketPrices={activity?.ticketPrice ?? []}
            isContinuous={activity.isContinuous}
            discount={0} // FIXME: remove, this is deprecated
            onHoverCard={() => {
              setCenterId(activity._id);
            }}
          />
        );
      })}
    </>
  );
};

export default SearchContentSection;
