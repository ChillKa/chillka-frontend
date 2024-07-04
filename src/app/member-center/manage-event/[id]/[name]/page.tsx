import { ArrowLeftFromLine } from 'lucide-react';
import Link from 'next/link';
import ManagementActivityTable from '../../utils/ManagementActivityTable';
import { DummyOrders } from '../../utils/dummy';

type ManageEventIdPageProps = {
  params: { id: string; name: string };
};

const ManageEventIdPage = async ({ params }: ManageEventIdPageProps) => {
  const { id, name } = params;

  const decodeName = decodeURIComponent(name);
  // FIXME: Change to use real api
  // const { participants } = await getParticipant(id);
  console.log(id);
  const orders = DummyOrders;

  return (
    <div className="relative text-primary">
      <div className="relative mb-6 h-[8.125rem] xl:flex xl:h-fit xl:items-center xl:justify-between">
        <Link
          href="/member-center/manage-event"
          className="flex flex-row gap-2"
        >
          <ArrowLeftFromLine className="size-12" />
          <h1 className="mb-8 text-5xl/none font-bold xl:mb-0">{decodeName}</h1>
        </Link>
      </div>

      <section className="flex flex-col gap-2">
        <ManagementActivityTable orders={orders} />
      </section>
    </div>
  );
};

export default ManageEventIdPage;
