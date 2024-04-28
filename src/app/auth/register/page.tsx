'use client';

import { Card, CardContent, CardHeader } from '@components/ui/card';
import RegisterForm from '@components/user/RegisterForm';

const RegisterPage = () => {
  return (
    <section className="flex w-full justify-center">
      <Card className="mt-2 w-[40%]">
        <CardHeader className="flex flex-col items-center justify-start">
          <h1 className="text-2xl font-bold">註冊</h1>
        </CardHeader>
        <CardContent>
          <RegisterForm
            onSubmit={(data) => {
              console.log(data);
            }}
          />
        </CardContent>
      </Card>
    </section>
  );
};

export default RegisterPage;
