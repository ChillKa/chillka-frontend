/* TODO: enhance display in ticket section */

'use client';

import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@components/ui/collapsible';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Separator } from '@components/ui/separator';
import { Switch } from '@components/ui/switch';
import { H2, H4, Subtle } from '@components/ui/typography';
import { createActivityFormSchema } from '@lib/definitions';
import { ChevronsUpDownIcon, Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import ActivityDateWrapper from '../fields/ActitvityDateWraper';
import { sectionIds } from '../fields/utils';

type FormSchema = z.infer<typeof createActivityFormSchema>;

type TicketFormSectionProps = {
  form: UseFormReturn<FormSchema>;
};

const TicketFormSection = ({ form }: TicketFormSectionProps) => {
  const [isChillKaMode, setIsChillKaMode] = useState(false);
  const {
    control,
    formState: { errors },
  } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tickets',
  });

  const { setValue, getValues } = form;

  useEffect(() => {
    const prevTicketsValues = getValues('tickets');

    setValue(
      'tickets',
      prevTicketsValues.map((preValues) => {
        return {
          ...preValues,
          price: isChillKaMode ? 0 : 100,
          purchaseLimit: isChillKaMode ? 1 : 1,
        };
      })
    );
  }, [isChillKaMode]);

  return (
    <>
      <Separator />
      <div id={sectionIds.tickets} className="max-w-[26rem] space-y-6">
        <H2>票券設定</H2>
        <div className="flex items-center gap-2">
          <Switch
            checked={isChillKaMode}
            onCheckedChange={() => setIsChillKaMode((prevState) => !prevState)}
          />
          <Label>{isChillKaMode ? '揪咖' : '售票'}</Label>
        </div>
        <div>
          <H4 className="block" asChild>
            <Label>{isChillKaMode ? '揪咖模式' : '售票模式'}</Label>
          </H4>
          <Subtle className="text-primary-light">
            {isChillKaMode
              ? '揪咖模式中，該活動為免費報名參加，且每個帳號僅可報名一次'
              : '售票模式中，可自行設定票券，包括票價和數量'}
          </Subtle>
        </div>
        {fields.map((fieldItem, index) => {
          return (
            <Collapsible key={fieldItem.id}>
              <div className="flex items-center justify-between gap-2">
                <FormField
                  name={`tickets.${index}.name`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <FormItem className="space-y-1.5">
                        <FormControl>
                          <H4>
                            {field.value === ''
                              ? '點我隔壁展開票券'
                              : field.value}
                          </H4>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
                <CollapsibleTrigger asChild>
                  <Button type="button" variant="form">
                    <ChevronsUpDownIcon />
                  </Button>
                </CollapsibleTrigger>
              </div>
              {errors?.tickets?.[index] && (
                <p className="text-sm font-medium text-destructive">
                  請記得填寫票卷內容
                </p>
              )}
              <CollapsibleContent
                className="space-y-1.5 data-[state=closed]:hidden"
                forceMount
              >
                <FormField
                  name={`tickets.${index}.name`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="after:ml-1 after:text-destructive after:content-['*']">
                          票券名稱
                        </FormLabel>
                        <FormControl>
                          <Input
                            variant="form"
                            placeholder="請輸入你喜歡的稱呼"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  name={`tickets.${index}.price`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="after:ml-1 after:text-destructive after:content-['*']">
                          價格
                        </FormLabel>
                        <FormControl>
                          <Input
                            type={isChillKaMode ? 'hidden' : 'number'}
                            variant="form"
                            placeholder="請輸入票券價格"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  name={`tickets.${index}.participantCapacity`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="after:ml-1 after:text-destructive after:content-['*']">
                          人數限制
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            variant="form"
                            {...field}
                            onChange={(e) => field.onChange(+e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name={`tickets.${index}.unlimitedQuantity`}
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
                      <Label>不限制人數</Label>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`tickets.${index}.startDateTime`}
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
                  name={`tickets.${index}.fromToday`}
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
                <FormField
                  control={form.control}
                  name={`tickets.${index}.endDateTime`}
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
                  name={`tickets.${index}.noEndDate`}
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
                <FormField
                  name={`tickets.${index}.purchaseLimit`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <FormItem className="space-y-1.5">
                        <FormLabel>每次購買數量限制</FormLabel>
                        <FormControl>
                          <Input
                            type={isChillKaMode ? 'hidden' : 'number'}
                            variant="form"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  name={`tickets.${index}.description`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <FormItem className="space-y-1.5">
                        <FormLabel>票券說明</FormLabel>
                        <FormControl>
                          <Input
                            variant="form"
                            placeholder="請輸入活動票券說明"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                {index > 0 ? (
                  <Button
                    variant="form"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    <Trash2Icon />
                  </Button>
                ) : null}
              </CollapsibleContent>
            </Collapsible>
          );
        })}
        <Button
          variant="form"
          type="button"
          className="block"
          onClick={() => {
            append({
              name: '',
              price: 0,
              fromToday: false,
              noEndDate: false,
              participantCapacity: 1,
              unlimitedQuantity: false,
            });
          }}
        >
          增加票券販售種類
        </Button>
      </div>
    </>
  );
};

export default TicketFormSection;
