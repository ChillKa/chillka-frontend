import { fetchActivity } from '@action/activity';
import OrganizerName from '@components/AcitivyPage/OrganizerSection/OrganizerName';
import { P } from '@components/ui/typography';
import cn from '@lib/utils';
import { IAcitivityResponse } from 'src/types/activity';

type OrganizerSectionProps = {
  className: string;
  activityId?: string;
  existingData?: IAcitivityResponse;
};

const OrganizerSection = async ({
  className,
  activityId,
  existingData,
}: OrganizerSectionProps) => {
  const response = await fetchActivity(activityId as string);
  const data = response.result ?? existingData!;

  return (
    <section className={cn('border-b py-6 text-primary xl:py-12', className)}>
      <div className="text-2xl font-bold -tracking-[0.006em] xl:text-3xl xl:-tracking-[0.0075em]">
        主辦方
      </div>
      <OrganizerName className="mb-4 mt-6 xl:mb-6" data={data} />
      <div className="flex flex-col gap-4 xl:flex-row xl:justify-between">
        <div className="flex items-center justify-between xl:block xl:flex-grow xl:border-l xl:px-4">
          <div className="text-sm/6 font-medium">聯絡人</div>
          <P>{data.activity.organizer.contactName}</P>
        </div>
        <div className="flex items-center justify-between xl:block xl:flex-grow xl:border-l xl:px-4">
          <div className="text-sm/6 font-medium">聯絡電話</div>
          <P>{data.activity.organizer.contactPhone}</P>
        </div>
        <div className="flex items-center justify-between xl:block xl:flex-grow xl:border-x xl:px-4">
          <div className="text-sm/6 font-medium">聯絡信箱</div>
          <P>{data.activity.organizer.contactEmail}</P>
        </div>
      </div>
    </section>
  );
};

export default OrganizerSection;
