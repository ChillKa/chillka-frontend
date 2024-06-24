import SkeletonOrganizerName from '@components/AcitivyPage/OrganizerSection/OrganizerName/SkeletonOrganizerName';
import { Skeleton } from '@components/ui/skeleton';

const SkeletonOrganizerSection = () => {
  return (
    <div className="border-b py-6 xl:py-12">
      <Skeleton className="mb-4 h-7 w-[15%] xl:mb-6 xl:h-8" />
      <SkeletonOrganizerName />
      <div className="flex flex-col gap-4 xl:flex-row xl:justify-between">
        <div className="flex items-center justify-between xl:block xl:flex-grow xl:border-l xl:px-4">
          <Skeleton className="h-6" />
          <Skeleton className="mt-1 h-7" />
        </div>
        <div className="flex items-center justify-between xl:block xl:flex-grow xl:border-l xl:px-4">
          <Skeleton className="h-6" />
          <Skeleton className="mt-1 h-7" />
        </div>
        <div className="flex items-center justify-between xl:block xl:flex-grow xl:border-x xl:px-4">
          <Skeleton className="h-6" />
          <Skeleton className="mt-1 h-7" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonOrganizerSection;
