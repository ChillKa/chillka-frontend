import { fetchAPI } from '@action/utils';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { ticketID: string } }
) {
  try {
    const { ticketID } = params;
    const response = await fetchAPI({
      api: `/auth/orders/use-serial-number`,
      method: 'PUT',
      data: {
        serialNumber: ticketID,
      },
      shouldAuth: true,
    });

    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      const errorMessage = contentType?.includes('application/json')
        ? await response.json()
        : await response.text();
      return Response.json({ status: 'failed', message: errorMessage });
    }

    return Response.json({ status: 'success', message: '成功註冊' });
  } catch (error) {
    return Response.json({ status: 'failed', message: `${error}` });
  }
}
