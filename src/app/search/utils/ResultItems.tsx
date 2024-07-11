import { Activity } from '@action/activity';
import {
  IntersectionObserverEventCard,
  SearchResultEventCard,
} from '@components/EventCard';

export type ResultItemsProp = {
  results: Activity[];
  setCenterId: (id: string) => void;
  isMobile: boolean;
};

const ResultItems = ({ results, setCenterId, isMobile }: ResultItemsProp) => {
  return (
    <div id="result-items">
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
            organizer={activity.organizer?.contactName ?? '未知舉辦者'}
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
            organizer={activity.organizer?.contactName ?? '未知舉辦者'}
            ticketPrices={activity?.ticketPrice ?? []}
            isContinuous={activity.isContinuous}
            discount={0}
            onHoverCard={() => {
              setCenterId(activity._id);
            }}
          />
        );
      })}
    </div>
  );
};

export default ResultItems;
