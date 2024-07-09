import PaymentSuccessSection from '../utils/PaymentSuccessSection';

type CompletePageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const CompletePage = ({ searchParams }: CompletePageProps) => {
  const { status } = searchParams;
  console.log(status);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <PaymentSuccessSection />
    </div>
  );
};

export default CompletePage;
