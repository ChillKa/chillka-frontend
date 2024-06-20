import { fetchActivity } from '@action/activity';
import ActivitySection from '@components/AcitivyPage/ActivitySection';
import CoverSection from '@components/AcitivyPage/CoverSection';
import ErrorContent from '@components/AcitivyPage/ErrorContent';
import LinkSection from '@components/AcitivyPage/LinkSection';
import MapSection from '@components/AcitivyPage/MapSection';
import OrganizerSection from '@components/AcitivyPage/OrganizerSection';
import QuestionsSetcion from '@components/AcitivyPage/QuestionsSetcion';
import TicketSection from '@components/AcitivyPage/TicketSection';

const Page = async ({ params }: { params: { id: string } }) => {
  const result = await fetchActivity(params.id);

  if (result.status === 'failed') {
    return <ErrorContent />;
  }

  const { data } = result;

  return (
    <>
      <CoverSection className="" covers={result.data.activity.cover} />
      <div className="mx-auto mb-24 mt-6 xl:mt-12 xl:flex xl:max-w-[81rem] xl:justify-between xl:space-x-[7.75rem]">
        <div className="grow px-3 xl:px-0">
          <ActivitySection
            className=""
            type={data.activity.type}
            category={data.activity.category}
            name={data.activity.name}
            location={data.activity.location}
            address={data.activity.address}
            unlimitedQuantity={data.activity.unlimitedQuantity}
            participantCapacity={data.activity.participantCapacity}
            websiteName={data.activity.organizer.websiteName}
            websiteURL={data.activity.organizer.websiteURL}
            summary={data.activity.summary}
            details={data.activity.details}
          />
          {data.activity.type === '線下' ? (
            <MapSection
              className=""
              location={data.activity.location}
              address={data.activity.address}
            />
          ) : (
            <LinkSection className="" />
          )}
          <OrganizerSection
            className=""
            organizer={data.activity.organizer.name}
            profilePicture={data.activity.organizer.profilePicture}
            contactName={data.activity.organizer.contactName}
            contactPhone={data.activity.organizer.contactPhone}
            contactEmail={data.activity.organizer.contactEmail}
          />
          <QuestionsSetcion
            className="border-primary"
            questions={data.questions}
            creatorId={data.activity.creatorId}
          />
        </div>
        <TicketSection
          className=""
          participated={data.activity?.participated ?? false}
          saved={data.activity?.saved ?? false}
          organizer={data.activity.organizer.name}
          profilePicture={data.activity.organizer.profilePicture}
          name={data.activity.name}
          type={data.activity.type}
          unlimitedQuantity={data.activity.unlimitedQuantity}
          participantCapacity={data.activity.participantCapacity}
          displayRemainingTickets={data.activity.displayRemainingTickets}
          remainingTickets={data.activity.remainingTickets}
        />
      </div>
    </>
  );
};

export default Page;
