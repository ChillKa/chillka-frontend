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
import { H3, H4, Large, P, Small } from '@components/ui/typography';
import { toast } from '@components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatActivityTime, formatTicketTime } from '@lib/dateUtils';
import { formatPrice } from '@lib/fomatPrice';
import { CalendarDays, CircleDollarSign, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { IAcitivityResponse } from 'src/types/activity';
import { z } from 'zod';
import { sendPayment } from './actions';

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
  activityId: string;
  totalAmount: number;
};
const FillTicketInfoSection = ({
  data,
  selectedTickets,
  activityId,
  totalAmount,
}: FillTicketInfoSectionProps) => {
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const firstSelectedTicket = Object.entries(selectedTickets).find(
      ([_, quantity]) => quantity > 0
    );

    if (!firstSelectedTicket) {
      toast({
        variant: 'destructive',
        title: '未選擇票券',
      });
      return;
    }

    const [ticketId, quantity] = firstSelectedTicket;
    const ticket = data.tickets.find((t) => t._id === ticketId);

    if (!ticket) {
      toast({
        variant: 'destructive',
        title: '找不到票券',
      });
      return;
    }

    const paymentProps = {
      activityId,
      ticketId,
      orderContact: {
        name: values.name,
        email: values.email,
        phone: values.phone,
      },
      payment: {
        amount: (ticket.price * quantity).toString(),
        orderNumber: quantity,
      },
      itemName: ticket.name,
      tradeDesc: `${data.activity.name} - ${ticket.name}`,
    };

    try {
      const result = await sendPayment(paymentProps);
      if (result.status === 'success' && result.html) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = result.html;

        const tmpForm = tempDiv.querySelector('form');
        if (tmpForm) {
          document.body.appendChild(tmpForm);
          tmpForm.submit();
        } else {
          throw new Error('無法找到支付表單');
        }
      } else {
        throw new Error(result.message || '支付初始化失敗');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: `支付過程中發生錯誤: ${error instanceof Error ? error.message : String(error)}`,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section id="ticket-detail" className="flex-1">
          <Card className="bg-transparent p-6 text-primary">
            <H3>訂票明細</H3>
            <div className="my-6 mb-4 space-y-2">
              <H4 className="font-medium">{data.activity.name}</H4>
              <P className="flex items-center">
                <CalendarDays className="mr-2" />
                {formatActivityTime(
                  data.activity.startDateTime,
                  data.activity.endDateTime,
                  data.activity.noEndDate
                )}
              </P>
              <P className="flex items-center">
                <MapPin className="mr-2" />
                {data.activity.location}
              </P>
            </div>
            {data.tickets.map((ticket) => {
              const quantity = selectedTickets[ticket._id] || 0;
              if (quantity > 0) {
                return (
                  <div key={ticket._id} className="mb-2 space-y-2">
                    <H4 className="font-medium">{ticket.name}</H4>
                    <P className="flex items-center">
                      <CalendarDays className="mr-2" />
                      {formatTicketTime(
                        ticket.startDateTime,
                        ticket.endDateTime,
                        ticket.noEndDate
                      )}
                    </P>
                    <P className="flex items-center">
                      <CircleDollarSign className="mr-2" />
                      NT${formatPrice(ticket.price)} x {quantity}
                    </P>
                  </div>
                );
              }
              return null;
            })}
            <div className="mt-4 space-y-2 border-t pt-4">
              <H4>支付金額</H4>
              <Large className="tracking-wide">
                TW${formatPrice(totalAmount)}
              </Large>
            </div>
          </Card>

          <Card className="mt-8 bg-transparent p-6 text-primary">
            <H3>訂購者資料</H3>
            <div className="mt-6 space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>名字*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="王小明"
                        className="bg-white placeholder:text-base placeholder:text-[#8F8A88]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>手機號碼*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0912345678"
                        className="bg-white placeholder:text-base placeholder:text-[#8F8A88]"
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
                    <FormLabel>電子信箱*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@gmail.com"
                        className="bg-white placeholder:text-base placeholder:text-[#8F8A88]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="flex items-center space-y-1 leading-none">
                      <FormLabel className="cursor-pointer">
                        同意服務條款
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
        </section>

        <section id="ticket-payment-info" className="flex-1">
          <Card className="mt-8 bg-transparent p-6 text-primary">
            <H3 className="mb-6">選擇付款方式</H3>
            <RadioGroup defaultValue="credit-card">
              <div className="mb-2 flex items-center space-x-2">
                <RadioGroupItem value="credit-card" id="credit-card" />
                <Label htmlFor="credit-card">
                  <P>ECPay</P>
                </Label>
              </div>
            </RadioGroup>
            <Small className="mt-4">
              選擇本次訂單付款方式，使用信用卡付款將會有額外手續費，請您小心核對金額，一旦付款將無法取消退款。
            </Small>
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
