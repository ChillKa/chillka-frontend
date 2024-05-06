'use client';

import { updateUser } from '@action/user';
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
import { userFormSchema } from '@lib/definitions';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface UserProfileFormProps {
  defaultData: z.infer<typeof userFormSchema>;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ defaultData }) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(userFormSchema),
    defaultValues: defaultData,
  });

  const handleEditUser = form.handleSubmit(async (data) => {
    startTransition(async () => {
      const result = await updateUser(data);
      if (result?.status === 'success') {
        toast({
          title: result?.message,
        });
      }
    });
  });

  return (
    <Form {...form}>
      <form
        onSubmit={handleEditUser}
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

        <Button disabled={isPending} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default UserProfileForm;
