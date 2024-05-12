'use client';

import { Button } from '@components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { toast } from '@components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerFormSchema } from '@lib/definitions';
import Link from 'next/link';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { register } from 'src/action/auth';

const RegisterForm: React.FC = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
      displayName: '',
    },
  });

  const handleSubmitRegister = form.handleSubmit(async (data) => {
    startTransition(async () => {
      const result = await register(data);
      if (result?.message !== '') {
        toast({
          title: result?.message ?? 'Unknown error',
          variant: result?.status === 'success' ? 'default' : 'destructive',
        });
      }
    });
  });

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmitRegister}
        className="flex w-full flex-col justify-center space-y-2"
      >
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Please Type Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Plesase Type Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Plesase Type Your Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} type="submit">
          Submit
        </Button>
        <section className="flex items-center justify-center">
          <p>已經有帳號?</p>
          <Link href="/auth/login" replace>
            <Button variant="ghost">登入</Button>
          </Link>
        </section>
      </form>
    </Form>
  );
};

export default RegisterForm;
