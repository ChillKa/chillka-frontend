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
import { Small } from '@components/ui/typography';
import { toast } from '@components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '@lib/definitions';
import { useAuthContext } from '@store/AuthProvider/AuthProvider';
import Link from 'next/link';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const LoginForm: React.FC = () => {
  const { login } = useAuthContext();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.output<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmitLogin = form.handleSubmit(async (data) => {
    startTransition(async () => {
      const result = await login(data);
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
        onSubmit={handleSubmitLogin}
        className="flex w-full flex-col space-y-4 text-primary"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>信箱</FormLabel>
              <FormControl>
                <Input
                  className="bg-white placeholder:text-base placeholder:text-[#8F8A88]"
                  placeholder="請輸入信箱"
                  {...field}
                />
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
              <FormLabel>密碼</FormLabel>
              <FormControl>
                <Input
                  className="bg-white placeholder:text-base placeholder:text-[#8F8A88]"
                  type="password"
                  placeholder="請輸入密碼"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          登入
        </Button>
        <Link
          className="flex justify-end text-primary transition hover:text-primary/70"
          href="/auth/forgot-password"
        >
          <Small>忘記密碼？</Small>
        </Link>
      </form>
    </Form>
  );
};

export default LoginForm;
