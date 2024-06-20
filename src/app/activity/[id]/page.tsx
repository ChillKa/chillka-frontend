'use client';

import ActivitySection from '@components/AcitivyPage/ActivitySection';
import CoverSection from '@components/AcitivyPage/CoverSection';
import ErrorContent from '@components/AcitivyPage/ErrorContent';
import LinkSection from '@components/AcitivyPage/LinkSection';
import MapSection from '@components/AcitivyPage/MapSection';
import OrganizerSection from '@components/AcitivyPage/OrganizerSection';
import QuestionsSetcion from '@components/AcitivyPage/QuestionsSetcion';
import TicketSection from '@components/AcitivyPage/TicketSection';
import ActivityProvider, {
  useActivityContext,
} from '@store/ActivityProvider/ActivityProvider';
import { useEffect } from 'react';

type PageContentProps = {
  id: string;
};

const PageContent = ({ id }: PageContentProps) => {
  const { data, loadActivity } = useActivityContext();

  useEffect(() => {
    loadActivity(id);
  }, [id, loadActivity]);

  if (!data) {
    return <ErrorContent />;
  }

  return (
    <>
      <CoverSection className="" covers={data.activity.cover} />
      <div className="mx-auto mb-24 mt-6 xl:mt-12 xl:flex xl:max-w-[81rem] xl:justify-between xl:space-x-[7.75rem]">
        <div className="grow px-3 xl:px-0">
          <ActivitySection className="" />
          {data.activity.type === '線下' ? (
            <MapSection className="" />
          ) : (
            <LinkSection className="" />
          )}
          <OrganizerSection className="" />
          <QuestionsSetcion className="border-primary" />
        </div>
        <TicketSection className="" />
      </div>
    </>
  );
};

const Page: React.FC<{ params: { id: string } }> = ({ params }) => (
  <ActivityProvider>
    <PageContent id={params.id} />
  </ActivityProvider>
);

export default Page;
