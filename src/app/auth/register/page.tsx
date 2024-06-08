import { Card, CardContent, CardHeader } from '@components/ui/card';
import { H3 } from '@components/ui/typography';
import RegisterForm from '@components/user/RegisterForm';

const RegisterPage = () => {
  return (
    <section>
      <Card className="bg-surface">
        <CardHeader className="text-center">
          <H3 className="text-primary">註冊</H3>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </section>
  );
};

export default RegisterPage;
