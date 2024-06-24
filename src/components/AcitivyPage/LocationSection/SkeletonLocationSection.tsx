import { Skeleton } from '@components/ui/skeleton';

const SkeletonLocationSection = () => {
  return (
    <div className="border-y py-6 xl:py-12">
      <Skeleton className="mb-4 h-7 w-[15%] xl:mb-6 xl:h-8" />
      <Skeleton className="h-7 w-[30%]" />
    </div>
  );
};

export default SkeletonLocationSection;
