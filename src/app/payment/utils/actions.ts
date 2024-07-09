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

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      // free order
      const jsonResponse = await response.json();
      return {
        status: 'success',
        orderData: jsonResponse.data,
        message: jsonResponse.message,
      };
    }
    // payment order ecpay
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
