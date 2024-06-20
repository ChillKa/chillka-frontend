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
import { zodResolver } from '@hookform/resolvers/zod';
import { userCommentSchema } from '@lib/definitions';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const Comment = () => {
  const form = useForm<z.output<typeof userCommentSchema>>({
    resolver: zodResolver(userCommentSchema),
    defaultValues: {
      content: '',
    },
  });

  const handleSubmitComment = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitComment} className="w-full">
        <div className="flex grow border px-4 py-2">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="grow">
                <FormControl>
                  <Input
                    className="border-none p-0 placeholder:text-base placeholder:text-primary focus-visible:ring-0"
                    placeholder="您可以在此處提出任何關於活動的疑問或需求"
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
          >
            <Send size={24} />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Comment;
