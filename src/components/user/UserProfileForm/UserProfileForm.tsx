'use client';

import { updateUser } from '@action/user';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
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
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { Separator } from '@components/ui/separator';
import { H2, P } from '@components/ui/typography';
import { toast } from '@components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { userFormSchema } from '@lib/definitions';
import { EditIcon, UserCircle2Icon } from 'lucide-react';
import Image from 'next/image';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import AvatarImageUploader from '../AvatarImageUploader';

interface UserProfileFormProps {
  defaultData: z.infer<typeof userFormSchema>;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ defaultData }) => {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const form = useForm({
    mode: 'all',
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
        className="flex w-full flex-col justify-center"
      >
        <section className="flex items-baseline justify-between">
          <H2>會員帳號中心</H2>
          <Button
            variant="ghost"
            onClick={() => setIsEditing(true)}
            disabled={isEditing}
            className="inline-flex items-center gap-2 hover:bg-primary-super-light"
          >
            <P>編輯</P>
            <EditIcon className="mt-0.5 size-4" />
          </Button>
        </section>
        <Accordion
          type="multiple"
          className="w-full px-2"
          defaultValue={['item-1', 'item-2']}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="px-2 text-xl font-bold -tracking-[0.005em]">
              基本資料
            </AccordionTrigger>
            <AccordionContent>
              <Separator />
              <div className="max-w-[26rem] space-y-6 px-2 py-6">
                {!isEditing && (
                  <FormField
                    control={form.control}
                    name="profilePicture"
                    render={({ field }) => (
                      <div className="relative size-40">
                        {field.value ? (
                          <Image
                            src={field.value}
                            fill
                            alt="User's Avatar"
                            className="rounded-full"
                          />
                        ) : (
                          <UserCircle2Icon
                            className="size-full"
                            strokeWidth={1}
                          />
                        )}
                      </div>
                    )}
                  />
                )}
                {isEditing && (
                  <FormField
                    control={form.control}
                    name="profilePicture"
                    disabled={!isEditing}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <AvatarImageUploader
                            onFiledChange={field.onChange}
                            fieldName={field.name}
                            maxFiles={1}
                            onUploading={setIsUploading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">顯示名稱</FormLabel>
                      <FormControl>
                        <Input
                          variant="form"
                          placeholder={isEditing ? '請輸入你喜歡的稱呼' : '無'}
                          disabled={!isEditing}
                          defaultValue={field.value}
                          onChange={field.onChange}
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
                          variant="form"
                          placeholder={isEditing ? '請輸入真實姓名' : '無'}
                          disabled={!isEditing}
                          defaultValue={field.value}
                          onChange={field.onChange}
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
                          variant="form"
                          placeholder={isEditing ? '請輸入你的歲數' : '無'}
                          disabled={!isEditing}
                          defaultValue={field.value}
                          onChange={field.onChange}
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
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-8"
                          disabled={!isEditing}
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem variant="form" value="男" />
                            </FormControl>
                            <FormLabel className="font-normal">男</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem variant="form" value="女" />
                            </FormControl>
                            <FormLabel className="font-normal">女</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
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
                          variant="form"
                          placeholder={
                            isEditing
                              ? '請輸入你喜歡的介紹，寫下一些有趣的事項也可以。'
                              : '尚無，等待你的精彩簡介'
                          }
                          disabled={!isEditing}
                          defaultValue={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="px-2 text-xl font-bold -tracking-[0.005em]">
              聯絡資料
            </AccordionTrigger>
            <AccordionContent>
              <Separator />
              <div className="max-w-[26rem] space-y-6 px-2 py-6">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>電話</FormLabel>
                      <FormControl>
                        <Input
                          variant="form"
                          placeholder={isEditing ? '請輸入你的電話號碼' : '無'}
                          disabled={!isEditing}
                          defaultValue={field.value}
                          onChange={field.onChange}
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
                          variant="form"
                          placeholder={
                            isEditing ? '請輸入你的發票手機載具' : '無'
                          }
                          disabled={!isEditing}
                          defaultValue={field.value}
                          onChange={field.onChange}
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
                          variant="form"
                          placeholder={isEditing ? '請輸入你的住址' : '無'}
                          disabled={!isEditing}
                          defaultValue={field.value}
                          onChange={field.onChange}
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
                          variant="form"
                          placeholder={isEditing ? '請輸入你的email' : '無'}
                          disabled={!isEditing}
                          defaultValue={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mb-12 mt-6 flex min-h-2 w-full gap-x-2">
          {isEditing && (
            <>
              <Button
                variant="secondary"
                className="rounded-[0.375rem] bg-primary-super-light text-primary hover:bg-white"
                onClick={handleCancel}
              >
                取消
              </Button>
              <Button
                disabled={isPending || isUploading}
                variant="form"
                type="submit"
              >
                確定
              </Button>
            </>
          )}
        </div>
      </form>
    </Form>
  );
};

export default UserProfileForm;
