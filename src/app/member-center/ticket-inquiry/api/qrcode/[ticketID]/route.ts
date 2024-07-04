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
      return Response.json({ status: 'failed', message: errorMessage });
    }

    return Response.json({ status: 'success' });
  } catch (error) {
    return Response.json({ status: 'failed', message: `${error}` });
  }
}
