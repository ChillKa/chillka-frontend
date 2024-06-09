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
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordFormSchema } from '@lib/definitions';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ForgotPasswordForm = () => {
  const form = useForm<z.output<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = () => {
    console.log('test');
  };

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
        <Button type="submit">送出</Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
