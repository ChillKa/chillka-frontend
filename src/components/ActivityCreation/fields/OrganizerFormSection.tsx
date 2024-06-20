'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { H2 } from '@components/ui/typography';
import { createActivityFormSchema } from '@lib/definitions';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

type FormSchema = z.infer<typeof createActivityFormSchema>;

type OrganizerFormSectionProps = {
  form: UseFormReturn<FormSchema>;
};

const OrganizerFormSection = ({ form }: OrganizerFormSectionProps) => {
  return (
    <div className="max-w-[26rem] space-y-6">
      <H2>你的自我介紹</H2>
      <FormField
        control={form.control}
        name="organizer.name"
        render={({ field }) => (
          <FormItem className="space-y-1.5">
            <FormLabel>主辦方名稱</FormLabel>
            <FormControl>
              <Input
                variant="form"
                placeholder="請輸入你喜歡的稱呼"
                {...field}
              />
            </FormControl>
            <FormDescription className="text-primary-light">
              留下讓人印象深刻的好名字吧！
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <H2>聯絡資訊</H2>
      <FormField
        control={form.control}
        name="organizer.contactName"
        render={({ field }) => (
          <FormItem>
            <div className="space-y-1.5">
              <FormLabel>聯絡人姓名</FormLabel>
              <FormControl>
                <Input
                  variant="form"
                  placeholder="請輸入您的真實姓名"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="organizer.contactPhone"
        render={({ field }) => (
          <FormItem>
            <div className="space-y-1.5">
              <FormLabel>聯絡人電話</FormLabel>
              <FormControl>
                <Input variant="form" placeholder="請輸入您的電話" {...field} />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="organizer.contactEmail"
        render={({ field }) => (
          <FormItem>
            <div className="space-y-1.5">
              <FormLabel>聯絡人電子信箱</FormLabel>
              <FormControl>
                <Input
                  variant="form"
                  placeholder="請輸入您的e-mail"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <H2>相關連結</H2>
      <FormField
        control={form.control}
        name="organizer.websiteName"
        render={({ field }) => (
          <FormItem>
            <div className="space-y-1.5">
              <FormLabel>連結顯示名稱</FormLabel>
              <FormControl>
                <Input
                  variant="form"
                  placeholder="請輸入你想讓使用者記住的網站名稱"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-primary-light">
                如無，則不用填寫
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="organizer.websiteURL"
        render={({ field }) => (
          <FormItem>
            <div className="space-y-1.5">
              <FormLabel>網址</FormLabel>
              <FormControl>
                <Input variant="form" placeholder="請輸入網站位址" {...field} />
              </FormControl>
              <FormDescription className="text-primary-light">
                如無，則不用填寫
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};
export default OrganizerFormSection;
