import { ArrowLeftFromLine } from 'lucide-react';
import Link from 'next/link';
import ManagementActivityTable from '../utils/ManagementActivityTable';

type ManageEventIdPageProps = {
  params: { id: string };
};

const ManageEventIdPage = async ({ params }: ManageEventIdPageProps) => {
  const { id } = params;

  return (
    <div className="relative text-primary">
      <div className="relative mb-6 h-[8.125rem] xl:flex xl:h-fit xl:items-center xl:justify-between">
        <Link
          href="/member-center/manage-event"
          className="flex flex-row gap-2"
        >
          <ArrowLeftFromLine className="size-12" />
          <h1 className="mb-8 text-5xl/none font-bold xl:mb-0">
            台北101觀景票
          </h1>
        </Link>
        {id}
      </div>

      <section className="flex flex-col gap-2">
        <ManagementActivityTable id={id} />
      </section>
    </div>
  );
};

export default ManageEventIdPage;
