import { Skeleton } from '@components/ui/skeleton';

const SkeletonActivitySection = () => {
  return (
    <>
      <Skeleton className="mb-4 h-5 w-[5%] xl:mb-6" />
      <Skeleton className="mb-4 h-9 w-[50%] xl:mb-6 xl:h-12" />
      <div className="mt-6 space-y-6 border-y py-6 xl:mt-12 xl:space-y-8 xl:py-12">
        <div className="ml-6 xl:ml-10">
          <Skeleton className="h-7 w-[15%] xl:h-8" />
          <Skeleton className="h-6xl:h-7 mt-2 w-[20%]" />
        </div>
        <div className="ml-6 xl:ml-10">
          <Skeleton className="h-7 w-[15%] xl:h-8" />
          <Skeleton className="mt-2 h-6 w-[20%] xl:h-7" />
        </div>
        <div className="ml-6 xl:ml-10">
          <Skeleton className="h-7 w-[15%] xl:h-8" />
          <Skeleton className="mt-2 h-6 w-[20%] xl:h-7" />
        </div>
        <div className="ml-6 xl:ml-10">
          <Skeleton className="h-7 w-[15%] xl:h-8" />
          <Skeleton className="mt-2 h-6 w-[20%] xl:h-7" />
        </div>
      </div>
      <div className="space-y-1 border-b py-6 xl:py-12">
        <Skeleton className="h-7 w-[70%]" />
        <Skeleton className="h-7 w-[65%]" />
        <Skeleton className="h-7 w-[80%]" />
      </div>
      <div className="py-6 xl:py-12">
        <Skeleton className="h-7 w-[15%] xl:h-8" />
        <Skeleton className="mt-4 h-7 w-[30%] xl:mt-6" />
      </div>
    </>
  );
};

export default SkeletonActivitySection;
