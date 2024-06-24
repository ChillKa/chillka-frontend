import { Skeleton } from '@components/ui/skeleton';

const SkeletonQuestionsSetcion = () => {
  return (
    <div className="border-b py-6 xl:py-12">
      <Skeleton className="mb-4 h-7 w-[15%] xl:mb-6 xl:h-8" />
      <div className="space-y-6">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
      <Skeleton className="h-16 w-full" />
    </div>
  );
};

export default SkeletonQuestionsSetcion;
