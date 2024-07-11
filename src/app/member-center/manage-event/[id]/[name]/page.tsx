import { ArrowLeftFromLine } from 'lucide-react';
import Link from 'next/link';
import ManagementActivitySection from '../../utils/ManagementActivitySection';
import { getOrderParticipant } from '../../utils/actions';

type ManageEventIdPageProps = {
  params: { id: string; name: string };
};

const ManageEventIdPage = async ({ params }: ManageEventIdPageProps) => {
  const { id, name } = params;

  const decodeName = decodeURIComponent(name);
  const { orders } = await getOrderParticipant(id);

  return (
    <div className="relative text-primary">
      <div className="relative mb-12 flex text-5xl/none font-bold">
        <Link href="/member-center/manage-event" className="mr-4 mt-3 h-fit">
          <ArrowLeftFromLine className="size-8" />
        </Link>
        <h1>{decodeName}</h1>
      </div>

      <section className="flex flex-col gap-2">
        <ManagementActivitySection orders={orders} />
      </section>
    </div>
  );
};

export default ManageEventIdPage;
