import { Card, CardContent, CardHeader } from '@components/ui/card';
import { H3 } from '@components/ui/typography';
import ResetPasswordForm from '@components/user/ResetPasswordForm';

const ResetPasswordPage = () => {
  return (
    <section>
      <Card className="bg-surface">
        <CardHeader className="text-center">
          <H3 className="text-primary">重設密碼</H3>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </section>
  );
};

export default ResetPasswordPage;
