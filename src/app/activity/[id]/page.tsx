import { fetchActivity } from '@action/activity';
import ActivitySection from '@components/ActivityPage/ActivitySection';
import SkeletonActivitySection from '@components/ActivityPage/ActivitySection/SkeletonActivitySection';
import CoverSection from '@components/ActivityPage/CoverSection';
import SkeletonCover from '@components/ActivityPage/CoverSection/SkeletonCover';
import LocationSection from '@components/ActivityPage/LocationSection';
import SkeletonLocationSection from '@components/ActivityPage/LocationSection/SkeletonLocationSection';
import OrganizerSection from '@components/ActivityPage/OrganizerSection';
import SkeletonOrganizerSection from '@components/ActivityPage/OrganizerSection/SkeletonOrganizerSection';
import QuestionsSetcion from '@components/ActivityPage/QuestionsSetcion';
import SkeletonQuestionsSetcion from '@components/ActivityPage/QuestionsSetcion/SkeletonQuestionsSetcion';
import TicketSection from '@components/ActivityPage/TicketSection';
import SkeletonTicketSection from '@components/ActivityPage/TicketSection/SkeletonTicketSection';
import { Metadata, ResolvingMetadata } from 'next';
import { Suspense } from 'react';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = params;

  const reponse = await fetchActivity(id);
  const data = reponse.result;

  const previousImages = (await parent).openGraph?.images || [];

  const name = data?.activity.name ?? 'chillka';
  const thumbnail = data?.activity.thumbnail ?? '/ogimage.png';
  const summary = data?.activity.summary;

  return {
    title: name,
    openGraph: {
      description: `chillka 揪咖活動名稱：${summary}`,
      images: [
        {
          url: thumbnail,
          width: 1294,
          height: 693,
          alt: `chillka 揪咖活動圖片：${name}`,
        },
        ...previousImages,
      ],
    },
  };
}

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
              previewMode={false}
            />
          </Suspense>
        </div>
        <Suspense fallback={<SkeletonTicketSection />}>
          <TicketSection className="" data={data!} previewMode={false} />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
