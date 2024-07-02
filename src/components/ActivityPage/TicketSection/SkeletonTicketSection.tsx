import SkeletonOrganizerName from '@components/ActivityPage/OrganizerSection/OrganizerName/SkeletonOrganizerName';
import { Skeleton } from '@components/ui/skeleton';

const SkeletonTicketSection = () => {
  return (
    <div className="h-fit w-full bg-surface xl:relative xl:max-w-[26rem] xl:border xl:px-8 xl:py-6">
      <SkeletonOrganizerName />
      <div className="space-y-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
};

export default SkeletonTicketSection;
