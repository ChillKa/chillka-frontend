import { fetchActivity } from '@action/activity';
import FillTicketInfoSection from '@app/payment/utils/FillTicketInfoSection';

type FillInfoPageProps = {
  params: {
    activityId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

const FillInfoPage = async ({ params, searchParams }: FillInfoPageProps) => {
  const { activityId } = params;

  const response = await fetchActivity(activityId);
  const activityData = response.result;

  const selectedTickets: { [key: string]: number } = {};
  let totalAmount = 0;

  Object.entries(searchParams).forEach(([key, value]) => {
    if (key.startsWith('ticket_') && typeof value === 'string') {
      const ticketId = key.replace('ticket_', '');
      selectedTickets[ticketId] = parseInt(value, 10);
    } else if (key === 'totalAmount' && typeof value === 'string') {
      totalAmount = parseInt(value, 10);
    }
  });

  return (
    <section className="mb-4 flex flex-col gap-6 xl:flex-row">
      {activityData && (
        <FillTicketInfoSection
          data={activityData}
          selectedTickets={selectedTickets}
          activityId={activityId}
          totalAmount={totalAmount}
        />
      )}
    </section>
  );
};
export default FillInfoPage;
