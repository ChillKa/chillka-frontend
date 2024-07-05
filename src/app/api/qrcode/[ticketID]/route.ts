import { fetchAPI } from '@action/utils';
import { NextRequest } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: { ticketID: string } }
) {
  try {
    const response = await fetchAPI({
      api: `/api/auth/orders/use-serial-number`,
      method: 'PUT',
      shouldAuth: true,
      data: {
        serialNumber: params.ticketID,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      return Response.json({ status: 'failed', message: errorMessage });
    }

    return Response.json({ status: 'success', message: '成功註冊' });
  } catch (error) {
    return Response.json({ status: 'failed', message: `${error}` });
  }
}
