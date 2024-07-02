import ManagementCard from './utils/ManagementCard';

const ManageEventPage = () => {
  return (
    <div className="relative text-primary">
      <div className="relative mb-6 h-[8.125rem] xl:flex xl:h-fit xl:items-center xl:justify-between">
        <h1 className="mb-8 text-5xl/none font-bold xl:mb-0">管理活動</h1>
      </div>
      <section className="flex flex-col gap-2">
        {Array.from({ length: 8 }).map((_, index) => {
          const num = index;
          return <ManagementCard key={num} />;
        })}
      </section>
    </div>
  );
};

export default ManageEventPage;
