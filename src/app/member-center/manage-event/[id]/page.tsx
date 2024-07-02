type ManageEventIdPageProps = {
  params: { id: string };
};

const ManageEventIdPage = async ({ params }: ManageEventIdPageProps) => {
  return <div>Current {params.id}</div>;
};

export default ManageEventIdPage;
