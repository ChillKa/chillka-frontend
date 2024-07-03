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
import GoogleOAuthButton from '@components/user/GoogleOAuthButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerFormSchema } from '@lib/definitions';
import { LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { register } from 'src/action/auth';

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
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
      if (result?.status === 'success') router.push('/auth/login');
    });
  });

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmitRegister}
        className="flex w-full flex-col space-y-4 text-primary"
      >
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>使用者名稱</FormLabel>
              <FormControl>
                <Input
                  className="bg-white placeholder:text-base placeholder:text-[#8F8A88]"
                  placeholder="請輸入使用者名稱"
                  {...field}
                />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>確認密碼</FormLabel>
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
        <Button disabled={isPending} type="submit">
          {isPending ? <LoaderCircle className="animate-spin" /> : '註冊'}
        </Button>
        <section className="flex items-center justify-center">
          <Small className="mr-2 font-normal text-primary">已經有帳號？</Small>
          <Link
            href="/auth/login"
            replace
            className="text-primary transition hover:text-primary/70"
          >
            <Small>登入</Small>
          </Link>
        </section>
      </form>
      <GoogleOAuthButton action="register" />
    </Form>
  );
};

export default RegisterForm;
