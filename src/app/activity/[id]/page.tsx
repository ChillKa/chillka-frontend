import { fetchActivity } from '@action/activity';
import ActivitySection from '@components/AcitivyPage/ActivitySection';
import SkeletonActivitySection from '@components/AcitivyPage/ActivitySection/SkeletonActivitySection';
import CoverSection from '@components/AcitivyPage/CoverSection';
import SkeletonCover from '@components/AcitivyPage/CoverSection/SkeletonCover';
import LocationSection from '@components/AcitivyPage/LocationSection';
import SkeletonLocationSection from '@components/AcitivyPage/LocationSection/SkeletonLocationSection';
import OrganizerSection from '@components/AcitivyPage/OrganizerSection';
import SkeletonOrganizerSection from '@components/AcitivyPage/OrganizerSection/SkeletonOrganizerSection';
import QuestionsSetcion from '@components/AcitivyPage/QuestionsSetcion';
import SkeletonQuestionsSetcion from '@components/AcitivyPage/QuestionsSetcion/SkeletonQuestionsSetcion';
import TicketSection from '@components/AcitivyPage/TicketSection';
import SkeletonTicketSection from '@components/AcitivyPage/TicketSection/SkeletonTicketSection';
import { Suspense } from 'react';

const Page = async ({ params }: { params: { id: string } }) => {
  const reponse = await fetchActivity(params.id);
  const data = reponse.result;

  return (
    <>
      <Suspense fallback={<SkeletonCover />}>
        <CoverSection className="" data={data!} />
      </Suspense>
      <div className="mx-auto mb-24 mt-6 xl:mt-12 xl:flex xl:max-w-[81rem] xl:justify-between xl:space-x-[7.75rem]">
        <div className="grow px-3 xl:px-0">
          <Suspense fallback={<SkeletonActivitySection />}>
            <ActivitySection className="" activityId={params.id} />
          </Suspense>
          <Suspense fallback={<SkeletonLocationSection />}>
            <LocationSection activityId={params.id} />
          </Suspense>
          <Suspense fallback={<SkeletonOrganizerSection />}>
            <OrganizerSection className="" activityId={params.id} />
          </Suspense>
          <Suspense fallback={<SkeletonQuestionsSetcion />}>
            <QuestionsSetcion
              className="border-primary"
              activityId={params.id}
            />
          </Suspense>
        </div>
        <Suspense fallback={<SkeletonTicketSection />}>
          <TicketSection className="" data={data!} />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
