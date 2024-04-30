import { Card, CardContent, CardHeader } from '@components/ui/card';
import LoginForm from '@components/user/LoginForm';

const LoginPage = () => {
  return (
    <section className="flex w-full justify-center">
      <Card className="mt-2 w-[50%]">
        <CardHeader>
          <h1 className="text-2xl font-bold">Login</h1>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </section>
  );
};

export default LoginPage;
