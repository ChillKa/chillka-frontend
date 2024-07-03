import { fetchAPI } from '@action/utils';

export async function PUT(ticketID: string) {
  try {
    const response = await fetchAPI({
      api: `/api/auth/orders/use-serial-number`,
      method: 'PUT',
      shouldAuth: true,
      data: {
        serialNumber: ticketID,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return {
        status: 'failed',
        message: errorMessage,
      };
    }

    return {
      status: 'success',
    };
  } catch (error) {
    return {
      status: 'failed',
      message: `${error}`,
    };
  }
}
