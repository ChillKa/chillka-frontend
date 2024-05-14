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
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface UserProfileFormProps {
  defaultData: z.infer<typeof userFormSchema>;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ defaultData }) => {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);

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
        setIsEditing(false);
      }
    });
  });

  const handleCancel = () => {
    setIsEditing(false);
    form.reset(defaultData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleEditUser}
        className="flex w-full flex-col justify-center space-y-2"
      >
        <section className="item-center flex">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            會員資料
          </h2>
          <Button
            variant="ghost"
            onClick={() => setIsEditing(true)}
            disabled={isEditing}
          >
            Edit
          </Button>
        </section>
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>顯示名稱</FormLabel>
              <FormControl>
                <Input
                  placeholder="Please Type Username"
                  disabled={!isEditing}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isEditing && (
          <div className="flex w-full justify-center space-x-2">
            <Button variant="secondary" onClick={handleCancel}>
              取消
            </Button>
            <Button disabled={isPending} type="submit">
              確定
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default UserProfileForm;
