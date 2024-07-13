import { fetchRecommendedActivity } from '@action/activity';
import WithErrorBoundaryAndSuspense from '@components/hoc/WithErrorBoundaryAndSuspense';
import { Skeleton } from '@components/ui/skeleton';
import PaymentFailureSection from '../utils/PaymentFailureSection';
import PaymentSuccessSection from '../utils/PaymentSuccessSection';
import { getPaymentResult } from '../utils/actions';

const CompletePage = async () => {
  const result = await getPaymentResult();
  const { orderId, status, activityId, message } = result;

  const data = await fetchRecommendedActivity();
  const { activities } = data;

  return (
    <div className="flex items-center justify-center">
      <WithErrorBoundaryAndSuspense
        loadingFallback={
          <Skeleton className="w-full max-w-md space-y-5 bg-transparent p-8 text-center text-primary" />
        }
      >
        {status === 'success' && (
          <PaymentSuccessSection
            activityId={activityId}
            orderId={orderId}
            message={message}
            activities={activities}
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
