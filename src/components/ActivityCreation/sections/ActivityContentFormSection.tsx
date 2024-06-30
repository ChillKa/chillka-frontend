'use client';

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
import cn from '@lib/utils';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import ActivityDateWrapper from '../fields/ActitvityDateWraper';
import ActivityCreationMap from '../fields/ActivityCreationMap';
import CategoryPicker from '../fields/CategoryPicker';
import ImageDropzone from '../fields/ImageDropzone';
import RichTextEditor from '../fields/RichTextEditor';

type FormSchema = z.infer<typeof createActivityFormSchema>;

type ActivityContentFormSectionProps = {
  form: UseFormReturn<FormSchema>;
};

const ActivityContentFormSection = ({
  form,
}: ActivityContentFormSectionProps) => {
  const { setValue, watch } = form;

  const activityTypeState = watch('type');
  const isRecurringState = watch('isRecurring');

  const getDayInChinese = (day: Date) => {
    const daysInChinese = [
      '星期日',
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六',
    ];
    const dayIndex = day.getDay();
    return daysInChinese[dayIndex];
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (
        name === 'fromToday' ||
        name === 'isRecurring' ||
        name === 'startDateTime'
      ) {
        if (value.isRecurring) {
          setValue(
            'recurring.day',
            getDayInChinese(
              value.fromToday
                ? new Date()
                : new Date(value.startDateTime as Date)
            )
          );
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  return (
    <>
      <Separator />
      <div id="activity-setting" className="space-y-6">
        <H2>封面與縮圖</H2>
        <H4>活動封面</H4>
        <FormField
          control={form.control}
          name="cover"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ImageDropzone
                  fieldName={field.name}
                  onFiledChange={field.onChange}
                  maxFiles={4}
                  multiple
                  maxSize={1024 * 1024 * 4}
                />
              </FormControl>
              <P asChild>
                <FormDescription className="text-primary-light">
                  請上傳至少一張清晰、有吸引力的活動封面圖片，以展示您的活動（最多四張）。
                  <br />
                  建議尺寸為 1920*1080px，檔案大小不超過 4MB
                </FormDescription>
              </P>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className="h-0.5 w-12" />
        <H4>活動縮圖</H4>
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ImageDropzone
                  fieldName={field.name}
                  onFiledChange={field.onChange}
                  maxFiles={1}
                />
              </FormControl>
              <P asChild>
                <FormDescription className="text-primary-light">
                  請上傳一張活動縮圖，將用於活動列表頁面等位置。 建議尺寸為
                  <br />
                  500*500px，檔案大小不超過 2MB
                </FormDescription>
              </P>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel>活動類型</FormLabel>
              <FormControl>
                <CategoryPicker
                  fieldName={field.name}
                  placeHolder="請選擇活動類型"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-1.5">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel>開始</FormLabel>
                <FormControl>
                  <ActivityDateWrapper
                    datePlaceHolder="設定開始日期"
                    timePlaceHolder="設定開始時間"
                    className="flex items-center gap-2"
                    name={field.name}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fromToday"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <Checkbox
                  variant="form"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FormControl>
                  <input
                    type="hidden"
                    name={field.name}
                    value={`${field.value}`}
                  />
                </FormControl>
                <Label>即日起</Label>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-1.5">
          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>結束</FormLabel>
                <FormControl>
                  <ActivityDateWrapper
                    datePlaceHolder="設定結束日期"
                    timePlaceHolder="設定結束時間"
                    className="flex items-center gap-2"
                    name={field.name}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="noEndDate"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <Checkbox
                  variant="form"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FormControl>
                  <input
                    type="hidden"
                    name={field.name}
                    value={`${field.value}`}
                  />
                </FormControl>
                <Label>無截止日期</Label>
                <FormMessage />
              </FormItem>
            )}
          />
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
                      <RadioGroupItem variant="form" value="線下" />
                    </FormControl>
                    <FormLabel>實體聚會</FormLabel>
                  </FormItem>
                  <input
                    name={field.name}
                    readOnly
                    type="hidden"
                    value={`${field.value}`}
                  />
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem
              className={cn(
                'space-y-1.5',
                activityTypeState === '線上' ? 'block' : 'hidden'
              )}
            >
              <FormLabel>活動連結</FormLabel>
              <FormControl>
                <Input variant="form" placeholder="請輸入活動連結" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem
              className={cn(
                'space-y-1.5',
                activityTypeState === '線下' ? 'block' : 'hidden'
              )}
            >
              <FormLabel>活動地點</FormLabel>
              <FormControl>
                <Input variant="form" placeholder="請輸入活動地點" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ActivityCreationMap
          className={activityTypeState === '線下' ? 'block' : 'hidden'}
          setLat={(lat: number) => {
            setValue('lat', lat);
          }}
          setLng={(lng: number) => {
            setValue('lng', lng);
          }}
          setAddress={(address: string) => {
            setValue('address', address);
          }}
        />
        <FormField
          control={form.control}
          name="lng"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <input type="hidden" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lat"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <input type="hidden" {...field} />
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
              <FormControl>
                <input type="hidden" {...field} />
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
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => {
            return (
              <FormItem className="space-y-1.5">
                <FormLabel>活動說明</FormLabel>
                <FormControl>
                  <RichTextEditor
                    name={field.name}
                    description={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
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
                  <input
                    name={field.name}
                    type="hidden"
                    value={`${field.value}`}
                    readOnly
                  />
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
                  <input
                    name={field.name}
                    readOnly
                    type="hidden"
                    value={`${field.value}`}
                  />
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
                  <input
                    name={field.name}
                    readOnly
                    type="hidden"
                    value={`${field.value}`}
                  />
                </div>
              </FormControl>
              <FormDescription className="text-primary-light">
                啟用週期設定將使活動固定舉辦
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {isRecurringState === true && (
          <FormField
            control={form.control}
            name="recurring.period"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="hidden" variant="form" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {isRecurringState === true && (
          <FormField
            control={form.control}
            name="recurring.day"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="hidden" variant="form" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    </>
  );
};

export default ActivityContentFormSection;
