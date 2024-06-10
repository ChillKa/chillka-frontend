import { endpoint } from '@lib/definitions';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const sessionCookie = cookies().get('session')?.value;

  const formData = await request.formData();
  const image = formData.get('uploadImage');

  if (!(image instanceof Blob)) {
    throw new Error('No image to be uploaded or invalid file type');
  }

  const finalHeaders: Record<string, string> = {
    Authorization: `Bearer ${sessionCookie}`,
  };

  const uploadFormData = new FormData();
  uploadFormData.append(
    'image',
    image,
    'steven-kamenar-MMJx78V7xS8-unsplash.jpg'
  );

  const response = await fetch(`${endpoint}/auth/upload-image`, {
    method: 'POST',
    body: uploadFormData,
    headers: {
      ...finalHeaders,
    },
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  const result = await response.json();
  console.log(result);
  return Response.json(result);
}
