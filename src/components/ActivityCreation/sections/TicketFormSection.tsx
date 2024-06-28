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
import { useState } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { z } from 'zod';

type FormSchema = z.infer<typeof createActivityFormSchema>;

type TicketFormSectionProps = {
  form: UseFormReturn<FormSchema>;
};

const TicketFormSection = ({ form }: TicketFormSectionProps) => {
  const [isChillKaMode, setIsChillKaMode] = useState(false);
  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tickets',
  });

  return (
    <>
      <Separator />
      <div id="ticket-setting" className="max-w-[26rem] space-y-6">
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
              <div className="flex items-center gap-2">
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
              <CollapsibleContent>
                <FormField
                  name={`tickets.${index}.name`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <FormItem className="space-y-1.5">
                        <FormLabel>票券名稱</FormLabel>
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
                        <FormLabel>價格</FormLabel>
                        <FormControl>
                          <Input
                            variant="form"
                            placeholder="請輸入你喜歡的稱呼"
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
                  name={`tickets.${index}.participantCapacity`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <FormItem className="space-y-1.5">
                        <FormLabel>人數限制</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            variant="form"
                            placeholder="請輸入你喜歡的稱呼"
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
                  name={`tickets.${index}.unlimitedQuantity`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <FormItem className="space-y-1.5">
                        <FormLabel>不限制人數</FormLabel>
                        <FormControl>
                          <Checkbox
                            variant="form"
                            onCheckedChange={field.onChange}
                            checked={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  name={`tickets.${index}.fromToday`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <FormItem className="space-y-1.5">
                        <FormLabel>即日起</FormLabel>
                        <FormControl>
                          <Checkbox
                            variant="form"
                            onCheckedChange={field.onChange}
                            checked={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  name={`tickets.${index}.noEndDate`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <FormItem className="space-y-1.5">
                        <FormLabel>無截止日期</FormLabel>
                        <FormControl>
                          <Checkbox
                            variant="form"
                            onCheckedChange={field.onChange}
                            checked={field.value}
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
              price: 100,
              fromToday: false,
              noEndDate: false,
              participantCapacity: 0,
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
