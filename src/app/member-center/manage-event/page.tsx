import ManagementCard from './utils/ManagementCard';
import { getCreatedActivities } from './utils/actions';

const ManageEventPage = async () => {
  const { activities } = await getCreatedActivities();

  return (
    <div className="relative text-primary">
      <h1 className="mb-6 h-[5rem] border-b-[0.0625rem] text-5xl/none font-bold xl:h-[6.25rem]">
        管理活動
      </h1>
      <section className="flex flex-col gap-4">
        {/* // FIXME: Change the proper type */}
        {activities.length > 0 &&
          activities.map((activity: any) => (
            <ManagementCard
              key={activity._id}
              id={activity._id}
              name={activity.name}
              thumbnail={activity.thumbnail}
              startDateTime={activity.startDateTime}
              endDateTime={activity.endDateTime}
              category={activity.category}
              address={activity.address}
              participantCount={
                (activity?.totalParticipantCapacity ?? 0) -
                (activity?.remainingTickets ?? 0)
              }
            />
          ))}
        {activities.length === 0 && (
          <div>
            <h1 className="mb-8 text-2xl/none font-bold xl:mb-0">
              目前無創建活動
            </h1>
          </div>
        )}
      </section>
    </div>
  );
};

export default ManageEventPage;
