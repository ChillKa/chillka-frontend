'use server';

import { fetchAPI } from '@action/utils';
import { redirect } from 'next/navigation';

interface SendPaymentProps {
  activityId: string;
  ticketId: string;
  orderContact: {
    name: string;
    email: string;
    phone: string;
  };
  payment: {
    amount: string;
    orderNumber: number;
  };
  itemName: string;
  tradeDesc: string;
}

const extractPaymentUrlFromHtml = (html: string): string | null => {
  const match = html.match(/action="([^"]+)"/);
  return match ? match[1] : null;
};

export async function sendPayment(props: SendPaymentProps) {
  const response = await fetchAPI({
    api: `/auth/payment`,
    method: 'POST',
    shouldAuth: true,
    data: props,
  });

  if (!response.ok) {
    const errorMessage = await response.text();

    return {
      status: 'failed',
      message: `${errorMessage ?? '失敗，請稍後重新再試。'} (${response.status})`,
    };
  }

  const html = await response.text();
  const paymentUrl = extractPaymentUrlFromHtml(html);

  if (paymentUrl) {
    redirect(paymentUrl);
  } else {
    throw new Error('無法獲取支付 URL');
  }
}
