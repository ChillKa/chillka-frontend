import { endpoint } from '@lib/definitions';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const sessionCookie = cookies().get('session')?.value;
  if (!sessionCookie) {
    return new Response(`請重新登入`, {
      status: 400,
    });
  }

  const formData = await request.formData();
  const image = formData.get('uploadImage');

  if (!(image instanceof Blob)) {
    return new Response(`請傳送正確的圖檔格式`, {
      status: 400,
    });
  }

  const finalHeaders: Record<string, string> = {
    Authorization: `Bearer ${sessionCookie}`,
  };

  const uploadFormData = new FormData();
  uploadFormData.append('image', image, image.name);

  const response = await fetch(`${endpoint}/auth/upload-images`, {
    method: 'POST',
    body: uploadFormData,
    headers: {
      ...finalHeaders,
    },
  });

  if (!response.ok) {
    return new Response(`圖片檔案上傳失敗`, {
      status: 400,
    });
  }

  const result = await response.json();
  return Response.json(result);
}
