import { Card, CardContent, CardHeader } from '@components/ui/card';
import { H3 } from '@components/ui/typography';
import LoginForm from '@components/user/LoginForm';

const LoginPage = () => {
  return (
    <section>
      <Card className="bg-surface">
        <CardHeader className="text-center">
          <H3 className="text-primary">登入</H3>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </section>
  );
};

export default LoginPage;
