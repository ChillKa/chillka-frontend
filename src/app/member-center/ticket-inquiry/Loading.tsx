import { LoaderCircle } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex h-[5rem] w-full items-center justify-center text-xl font-bold">
      <LoaderCircle className="animate-spin text-primary" />
    </div>
  );
};

export default Loading;
