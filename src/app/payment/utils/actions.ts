'use server';

import { fetchAPI } from '@action/utils';

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

export async function sendPayment(props: SendPaymentProps) {
  try {
    const response = await fetchAPI({
      api: `/auth/payment`,
      method: 'POST',
      shouldAuth: true,
      data: props,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `${errorMessage ?? '失敗，請稍後重新再試。'} (${response.status})`
      );
    }

    const html = await response.text();
    return { status: 'success', html };
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}
