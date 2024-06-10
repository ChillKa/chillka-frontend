/*
  - [x] setup upload image part in browser version
  - [] test upload image api
*/

import ActivityCreationForm from '@components/ActivityCreation/ActivityCreationForm';
import ActivityCreationSideBar from '@components/ActivityCreation/ActivityCreationSideBar';
import { Separator } from '@components/ui/separator';

const Page = async () => {
  return (
    <>
      <Separator className="h-[0.3px]" />
      <div className="mx-auto mt-24 flex max-w-[81rem] justify-between gap-3 text-primary">
        <ActivityCreationSideBar className="basis-1/3" />
        <ActivityCreationForm className="basis-2/3" />
      </div>
    </>
  );
};

export default Page;
