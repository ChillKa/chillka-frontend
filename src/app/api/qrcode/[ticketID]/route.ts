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

    const contentType = response.headers.get('content-type');
    const responseData = contentType?.includes('application/json')
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      return Response.json({
        status: 'failed',
        message:
          typeof responseData === 'string'
            ? responseData
            : responseData.message || '未知錯誤',
      });
    }

    return Response.json({
      status: 'success',
      message:
        typeof responseData === 'string'
          ? '成功註冊'
          : responseData.message || '成功註冊',
    });
  } catch (error) {
    return Response.json({
      status: 'failed',
      message: error instanceof Error ? error.message : '發生未知錯誤',
    });
  }
}
