'use client';

import ActivitySection from '@components/AcitivyPage/ActivitySection';
import CoverSection from '@components/AcitivyPage/CoverSection';
import LocationSection from '@components/AcitivyPage/LocationSection';
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
  const { loadActivity } = useActivityContext();

  useEffect(() => {
    loadActivity(id);
  }, [id, loadActivity]);

  return (
    <>
      <CoverSection className="" />
      <div className="mx-auto mb-24 mt-6 xl:mt-12 xl:flex xl:max-w-[81rem] xl:justify-between xl:space-x-[7.75rem]">
        <div className="grow px-3 xl:px-0">
          <ActivitySection className="" />
          <LocationSection />
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
