import { Skeleton } from '@components/ui/skeleton';

const SkeletonOrganizerName = () => {
  return (
    <div className="mb-4 mt-6 flex xl:mb-6">
      <div className="h-12 w-12 xl:h-20 xl:min-w-20">
        <Skeleton className="h-full w-full rounded-2xl" />
      </div>
      <Skeleton className="ml-4 h-7 w-full xl:h-8" />
    </div>
  );
};

export default SkeletonOrganizerName;
