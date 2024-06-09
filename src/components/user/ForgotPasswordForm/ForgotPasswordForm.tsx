'use client';

import { forgotPassword } from '@action/auth';
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
import { forgotPasswordFormSchema } from '@lib/definitions';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.output<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    startTransition(async () => {
      const result = await forgotPassword(data);
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
        onSubmit={handleSubmit}
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
        <Button type="submit" disabled={isPending}>
          送出
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
