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
import { EditIcon } from 'lucide-react';
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
            編輯會員資料
            <EditIcon className="size-4" />
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
                  placeholder={isEditing ? '請輸入你喜歡的稱呼' : '無'}
                  disabled={!isEditing}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="realName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>真實名稱</FormLabel>
              <FormControl>
                <Input
                  placeholder={isEditing ? '請輸入真實姓名' : '無'}
                  disabled={!isEditing}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem>
              <FormLabel>生日</FormLabel>
              <FormControl>
                <Input
                  placeholder={isEditing ? '請輸入你的生日' : '無'}
                  disabled={!isEditing}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>年齡</FormLabel>
              <FormControl>
                <Input
                  placeholder={isEditing ? '請輸入你的歲數' : '無'}
                  disabled={!isEditing}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>性別</FormLabel>
              <FormControl>
                <Input
                  placeholder={isEditing ? '請輸入你的性別' : '無'}
                  disabled={!isEditing}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="introduction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>自我介紹</FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    isEditing
                      ? '請輸入你喜歡的介紹，寫下一些有趣的事項也可以。'
                      : '尚無，等待你的精彩簡介'
                  }
                  disabled={!isEditing}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>電話</FormLabel>
              <FormControl>
                <Input
                  placeholder={isEditing ? '請輸入你的電話號碼' : '無'}
                  disabled={!isEditing}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneBarcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>手機載具</FormLabel>
              <FormControl>
                <Input
                  placeholder={isEditing ? '請輸入你的發票手機載具' : '無'}
                  disabled={!isEditing}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>地址</FormLabel>
              <FormControl>
                <Input
                  placeholder={isEditing ? '請輸入你的住址' : '無'}
                  disabled={!isEditing}
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
              <FormLabel>e-mail</FormLabel>
              <FormControl>
                <Input
                  placeholder={isEditing ? '請輸入你的email' : '無'}
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
