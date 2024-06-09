import { Card, CardContent, CardHeader } from '@components/ui/card';
import { H3 } from '@components/ui/typography';
import ForgotPasswordForm from '@components/user/ForgotPasswordForm';

const ForgotPasswordPage = () => {
  return (
    <section>
      <Card className="bg-surface">
        <CardHeader className="text-center">
          <H3 className="text-primary">忘記密碼</H3>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </section>
  );
};

export default ForgotPasswordPage;
