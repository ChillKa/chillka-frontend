import ManagementCard from './utils/ManagementCard';
import { getCreatedActivities } from './utils/actions';

const ManageEventPage = async () => {
  const { activities } = await getCreatedActivities();

  return (
    <div className="relative text-primary">
      <div className="relative mb-6 h-[8.125rem] xl:flex xl:h-fit xl:items-center xl:justify-between">
        <h1 className="mb-8 text-5xl/none font-bold xl:mb-0">管理活動</h1>
      </div>
      <section className="flex flex-col gap-2">
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
