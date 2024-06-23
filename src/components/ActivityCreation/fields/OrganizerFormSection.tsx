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
import { H2, H4, Subtle } from '@components/ui/typography';
import { createActivityFormSchema } from '@lib/definitions';
import { Label } from '@radix-ui/react-label';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import ImageDropzone from '../ui/ImageDropzone';

type FormSchema = z.infer<typeof createActivityFormSchema>;

type OrganizerFormSectionProps = {
  form: UseFormReturn<FormSchema>;
};

const OrganizerFormSection = ({ form }: OrganizerFormSectionProps) => {
  return (
    <div className="space-y-6">
      <H2>主辦方資訊</H2>
      <H4>你的自我介紹</H4>
      <Label>主辦方縮圖</Label>
      <ImageDropzone maxFiles={1} />
      <Subtle className="text-primary-light">
        請上傳你的頭像，尺寸為 500*500px，檔案大小不超過 2MB。
      </Subtle>
      <FormField
        control={form.control}
        name="organizer.name"
        render={({ field }) => (
          <FormItem className="max-w-[26rem] space-y-1.5">
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
      <H4>聯絡資訊</H4>
      <FormField
        control={form.control}
        name="organizer.contactName"
        render={({ field }) => (
          <FormItem>
            <div className="max-w-[26rem] space-y-1.5">
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
            <div className="max-w-[26rem] space-y-1.5">
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
            <div className="max-w-[26rem] space-y-1.5">
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
      <H4>相關連結</H4>
      <FormField
        control={form.control}
        name="organizer.websiteName"
        render={({ field }) => (
          <FormItem>
            <div className="max-w-[26rem] space-y-1.5">
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
            <div className="max-w-[26rem] space-y-1.5">
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
