'use client';

import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { Checkbox } from '@components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatActivityTime } from '@lib/dateUtils';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { IAcitivityResponse } from 'src/types/activity';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, '名子是必須的'),
  phone: z.string().min(10, '請輸入有效的手機號碼'),
  email: z.string().email('請輸入有效的電子郵件地址'),
  terms: z.boolean().refine((val) => val === true, {
    message: '您必須同意服務條款',
  }),
  paymentMethod: z.enum(['ecpay']),
});

type FillTicketInfoSectionProps = {
  data: IAcitivityResponse;
  selectedTickets: { [key: string]: number };
  totalAmount: number;
};
const FillTicketInfoSection = ({
  data,
  selectedTickets,
  totalAmount,
}: FillTicketInfoSectionProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      terms: false,
      paymentMethod: 'ecpay',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    router.push('/payment/complete');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section id="ticket-detail" className="flex-1">
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-bold">訂票明細</h2>
            <div className="mb-4">
              <h3 className="font-semibold">{data.activity.name}</h3>
              <p className="text-sm text-gray-600">
                {formatActivityTime(
                  data.activity.startDateTime,
                  data.activity.endDateTime,
                  data.activity.noEndDate
                )}
              </p>
              <p className="text-sm text-gray-600">{data.activity.location}</p>
            </div>
            {data.tickets.map((ticket) => {
              const quantity = selectedTickets[ticket._id] || 0;
              if (quantity > 0) {
                return (
                  <div key={ticket._id} className="mb-2">
                    <p className="font-semibold">{ticket.name}</p>
                    <p className="text-sm text-gray-600">
                      {ticket.startDateTime} 至 {ticket.endDateTime}
                    </p>
                    <p className="text-sm">
                      NTD$ {ticket.price} x {quantity}
                    </p>
                  </div>
                );
              }
              return null;
            })}
            <div className="mt-4 border-t pt-4">
              <p className="font-semibold">支付金額</p>
              <p className="text-xl font-bold">TWD {totalAmount}</p>
            </div>
          </Card>

          <Card className="mt-6 p-6">
            <h2 className="mb-4 text-xl font-bold">訂購者資料</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>名字*</FormLabel>
                      <FormControl>
                        <Input placeholder="王小明" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>手機號碼*</FormLabel>
                    <FormControl>
                      <Input placeholder="0912345678" {...field} />
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
                    <FormLabel>電子信箱*</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>同意服務條款</FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </Card>
        </section>

        <section id="ticket-payment-info" className="flex-1">
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-bold">選擇付款方式</h2>
            <RadioGroup defaultValue="credit-card">
              <div className="mb-2 flex items-center space-x-2">
                <RadioGroupItem value="credit-card" id="credit-card" />
                <Label htmlFor="credit-card">ECPay</Label>
              </div>
            </RadioGroup>
            <p className="mt-4 text-sm text-gray-600">
              選擇本次訂單付款方式，使用信用卡付款將會有額外手續費，請您小心核對金額，一旦付款將無法取消退款。
            </p>
            <Button className="mt-6 w-full" type="submit">
              確認付款
            </Button>
          </Card>
        </section>
      </form>
    </Form>
  );
};

export default FillTicketInfoSection;