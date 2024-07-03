'use client';

import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { Checkbox } from '@components/ui/checkbox';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';

const DUMMY = {
  event: {
    name: '夏日音樂節｜星光之夜',
    date: '2024-07-20 (六) 19:00 至 07-24 (三) 23:00',
    location: '台北市中正區凱達格蘭大道一段',
    additionalInfo: '任選日票優惠',
  },
  tickets: [
    {
      type: '早鳥票',
      date: '2024-07-18 19:00 至 07-20 23:59',
      price: 580,
      quantity: 1,
    },
    {
      type: '正式票',
      date: '2024-07-20 19:00 至 07-24 23:00',
      price: 630,
      quantity: 2,
    },
  ],
  totalAmount: 1840,
};

type FillInfoPageProps = {
  params: {
    activityId: string;
  };
};

const FillInfoPage = ({ params }: FillInfoPageProps) => {
  const { activityId } = params;
  return (
    <section className="mb-4 flex flex-col gap-6 xl:flex-row">
      <section id="ticket-detail" className="flex-1">
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-bold">訂票明細</h2>
          <div className="mb-4">
            <h3 className="font-semibold">{DUMMY.event.name}</h3>
            <p className="text-sm text-gray-600">{DUMMY.event.date}</p>
            <p className="text-sm text-gray-600">{DUMMY.event.location}</p>
            <p className="text-sm text-gray-600">
              {DUMMY.event.additionalInfo}
            </p>
          </div>
          {DUMMY.tickets.map((ticket, index) => {
            const num = index;
            return (
              <div key={num} className="mb-2">
                <p className="font-semibold">{ticket.type}</p>
                <p className="text-sm text-gray-600">{ticket.date}</p>
                <p className="text-sm">
                  NTD$ {ticket.price} x {ticket.quantity}
                </p>
              </div>
            );
          })}
          <div className="mt-4 border-t pt-4">
            <p className="font-semibold">支付金額</p>
            <p className="text-xl font-bold">TWD {DUMMY.totalAmount}</p>
          </div>
        </Card>

        <Card className="mt-6 p-6">
          <h2 className="mb-4 text-xl font-bold">訂購者資料</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">名字*</Label>
                <Input id="firstName" placeholder="小明" />
              </div>
              <div>
                <Label htmlFor="lastName">姓氏*</Label>
                <Input id="lastName" placeholder="王" />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">手機號碼*</Label>
              <Input id="phone" placeholder="0912345678" />
            </div>
            <div>
              <Label htmlFor="email">電子信箱*</Label>
              <Input id="email" placeholder="example@gmail.com" />
            </div>
            <div className="flex items-center gap-2 space-x-2">
              <Checkbox id="terms" type="button" />
              同意服務條款
            </div>
          </div>
        </Card>
      </section>

      <section id="ticket-payment-info" className="flex-1">
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-bold">選擇付款方式</h2>
          <RadioGroup defaultValue="credit-card">
            <div className="mb-2 flex items-center space-x-2">
              <RadioGroupItem value="credit-card" id="credit-card" />
              <Label htmlFor="credit-card">信用卡/金融卡</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="line-pay" id="line-pay" />
              <Label htmlFor="line-pay">LINE Pay</Label>
            </div>
          </RadioGroup>
          <p className="mt-4 text-sm text-gray-600">
            選擇本次訂單付款方式，使用信用卡付款將會有額外手續費，請您小心核對金額，一旦付款將無法取消退款。
          </p>
          <Button
            className="mt-6 w-full"
            onClick={() => {
              // FIXME: Change to implement to pay order
              console.log(activityId);
            }}
          >
            確認付款
          </Button>
        </Card>
      </section>
    </section>
  );
};
export default FillInfoPage;
