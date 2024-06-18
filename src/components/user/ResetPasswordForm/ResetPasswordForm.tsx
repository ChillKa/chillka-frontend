'use client';

import { resetPassword } from '@action/auth';
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
import { resetPasswordFormSchema } from '@lib/definitions';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const validateCode = searchParams.get('validateCode');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.output<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    startTransition(async () => {
      const result = await resetPassword(validateCode as string, data);
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
        onSubmit={handleSubmit}
        className="flex w-full flex-col space-y-4 text-primary"
      >
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
        <Button type="submit" disabled={isPending}>
          送出
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
