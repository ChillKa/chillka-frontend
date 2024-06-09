'use server';

import { endpoint } from '@lib/definitions';
import { cookies } from 'next/headers';

export async function uploadImage(formData: FormData) {
  // ...
  const sessionCookie = cookies().get('session')?.value;

  const image = formData.get('uploadImage');

  if (!(image instanceof Blob)) {
    throw new Error('No image to be uploaded or invalid file type');
  }

  const formdata = new FormData();
  formdata.append('image', image, 'steven-kamenar-MMJx78V7xS8-unsplash.jpg');

  const finalHeaders: Record<string, string> = {
    Authorization: `Bearer ${sessionCookie}`,
  };

  const response = await fetch(`${endpoint}/auth/upload-image`, {
    method: 'POST',
    body: formdata,
    headers: {
      ...finalHeaders,
    },
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  const result = await response.json();
  console.log(result);
  return result;
}

export async function uploadText(formData: FormData) {
  console.log(formData);
}
