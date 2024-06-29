'use client';

import { Button } from '@components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';

const Reply = () => {
  const form = useForm();
  return (
    <Form {...form}>
      <form onSubmit={() => {}}>
        <div className="flex grow border px-4 py-2">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="grow">
                <FormControl>
                  <Input
                    className="border-none p-0 placeholder:text-base placeholder:text-primary focus-visible:ring-0"
                    placeholder="請在此輸入您的回覆"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="ml-2 p-2 text-primary transition-colors hover:bg-transparent hover:text-primary/70 xl:ml-[0.625rem]"
            variant="ghost"
            // disabled={isPending}
          >
            <Send size={24} />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Reply;
