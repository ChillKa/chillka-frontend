'use client';

import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { Separator } from '@components/ui/separator';
import { Switch } from '@components/ui/switch';
import { H2, H4, P } from '@components/ui/typography';
import { createActivityFormSchema } from '@lib/definitions';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import ActivityTimePicker from '../ui/AcitivityTimePicker';
import ActivityDatePicker from '../ui/ActivityDatePicker';
import RichTextEditor from '../ui/RichTextEditor';

type FormSchema = z.infer<typeof createActivityFormSchema>;

type ActivityContentFormSectionProps = {
  form: UseFormReturn<FormSchema>;
};

const ActivityContentFormSection = ({
  form,
}: ActivityContentFormSectionProps) => {
  return (
    <>
      <Separator />
      <div className="space-y-6">
        <H2>封面與縮圖</H2>
        <H4>活動封面</H4>
        <P>
          請上傳至少一張清晰、有吸引力的活動封面圖片，以展示您的活動（最多四張）。
          <br />
          建議尺寸為 1920*1080px，檔案大小不超過 4MB
        </P>
        <Button variant="form" type="button">
          上傳活動封面
        </Button>
        <Separator className="h-0.5 w-12" />
        <H4>活動縮圖</H4>
        <P>
          請上傳一張活動縮圖，將用於活動列表頁面等位置。 建議尺寸為
          <br />
          500*500px，檔案大小不超過 2MB
        </P>
        <Button variant="form" type="button">
          上傳活動縮圖
        </Button>
      </div>
      <Separator className="h-[0.5px]" />
      <div className="max-w-[26rem] space-y-6">
        <H2>基本資料</H2>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel>活動名稱</FormLabel>
              <FormControl>
                <Input variant="form" placeholder="請輸入活動名稱" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* TODO: have to change dropdown menu with react hook form */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel>活動類型</FormLabel>
              <FormControl>
                <Input variant="form" placeholder="請輸入活動類型" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-1.5">
          <Label htmlFor="">開始</Label>
          <div className="flex gap-2">
            <ActivityDatePicker />
            <ActivityTimePicker />
          </div>
          <div className="flex gap-2">
            <Checkbox variant="form" />
            <Label>即日起</Label>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="">結束</Label>
          <div className="flex items-center gap-2">
            <ActivityDatePicker />
            <ActivityTimePicker />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox variant="form" />
            <Label>無截止日</Label>
          </div>
        </div>
      </div>
      <Separator className="h-[0.5px]" />
      <div className="space-y-6">
        <H2>活動地點</H2>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel>活動形式</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex"
                >
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem variant="form" value="線上" />
                    </FormControl>
                    <FormLabel>線上活動</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem variant="form" value="室內" />
                    </FormControl>
                    <FormLabel>線下室內</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem variant="form" value="室外" />
                    </FormControl>
                    <FormLabel>線下室外</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Separator className="h-[0.5px]" />
      <div className="space-y-6">
        <H2>摘要及說明</H2>
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem className="w-[26rem] space-y-1.5">
              <FormLabel>活動摘要</FormLabel>
              <FormControl>
                <Input variant="form" placeholder="請輸入活動摘要" {...field} />
              </FormControl>
              <FormDescription className="text-primary-light">
                顯示於首頁活動簡介、活動列表頁面等位置
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-1.5">
          <Label>活動說明</Label>
          <RichTextEditor />
        </div>
      </div>
      <Separator className="h-[0.5px]" />
      <div className="space-y-6">
        <H2>進階設定</H2>
        <FormField
          control={form.control}
          name="isPrivate"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel>活動隱私</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={`${field.value}`}
                  className="flex"
                >
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem variant="form" value="false" />
                    </FormControl>
                    <FormLabel>公開</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem variant="form" value="true" />
                    </FormControl>
                    <FormLabel>私人</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription className="text-primary-light">
                設定活動為私人時，將不會在平台上顯示
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="displayRemainingTickets"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel>剩餘票券/名額顯示</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="airplane-mode">
                    {field.value ? '顯示' : '不顯示'}
                  </Label>
                </div>
              </FormControl>
              <FormDescription className="text-primary-light">
                是否在活動頁面上顯示剩餘票券數量或可報名名額的資訊
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isRecurring"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel>連續活動週期</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="airplane-mode">
                    {field.value ? '啟用' : '不啟用'}
                  </Label>
                </div>
              </FormControl>
              <FormDescription className="text-primary-light">
                啟用週期設定將使活動固定舉辦
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default ActivityContentFormSection;
