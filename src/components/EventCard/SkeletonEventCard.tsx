import { Skeleton } from '@components/ui/skeleton';
import cn from '@lib/utils';

const SkeletonEventCard = () => {
  return (
    <div
      id="skeleton-card"
      className={cn(
        'bg-red flex h-[35.25rem] w-full flex-col gap-8',
        'xl:w-[26rem]'
      )}
    >
      <div className="relative h-[13rem] w-full overflow-hidden">
        <Skeleton className="absolute left-0 top-0 h-full w-full" />
      </div>

      <div className="w- flex h-[5.5rem] flex-col gap-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>

      <div className="flex h-[9rem] flex-col justify-between gap-4">
        <div className="flex justify-start gap-4">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="flex justify-start gap-4">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="flex justify-start gap-4">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="flex justify-start gap-4">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>

      <div className="flex h-7 items-center justify-start gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  );
};

export default SkeletonEventCard;
