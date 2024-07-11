import WithErrorBoundaryAndSuspense from '@components/hoc/WithErrorBoundaryAndSuspense';
import { Skeleton } from '@components/ui/skeleton';
import PaymentFailureSection from '../utils/PaymentFailureSection';
import PaymentSuccessSection from '../utils/PaymentSuccessSection';
import { getPaymentResult } from '../utils/actions';

const CompletePage = async () => {
  const result = await getPaymentResult();
  const { orderId, status, activityId, message } = result;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <WithErrorBoundaryAndSuspense
        fallback={
          <Skeleton className="w-full max-w-md space-y-5 bg-transparent p-8 text-center text-primary" />
        }
      >
        {status === 'success' && (
          <PaymentSuccessSection
            activityId={activityId}
            orderId={orderId}
            message={message}
          />
        )}
        {status === 'fail' && (
          <PaymentFailureSection activityId={activityId} message={message} />
        )}
      </WithErrorBoundaryAndSuspense>
    </div>
  );
};

export default CompletePage;
