'use server';

import { createActivityFormSchema, endpoint } from '@lib/definitions';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { IUploadImagesResult } from 'src/types/uploadImages';
import { ZodError, z } from 'zod';
import { fetchAPI } from './utils';

export type uploadImageState =
  | {
      status: 'success';
      data: IUploadImagesResult;
    }
  | {
      status: 'failed';
      message: string;
    };

export async function uploadImage(
  formData: FormData
): Promise<uploadImageState> {
  const sessionCookie = cookies().get('session')?.value;

  if (!sessionCookie) {
    return { status: 'failed', message: '請先登入' };
  }

  const image = formData.get('uploadImage');

  if (!(image instanceof Blob)) {
    return { status: 'failed', message: `請傳送正確的圖檔格式` };
  }

  const formdata = new FormData();
  formdata.append('image', image, image.name);

  const finalHeaders: Record<string, string> = {
    Authorization: `Bearer ${sessionCookie}`,
  };

  const response = await fetch(`${endpoint}/auth/upload-images`, {
    method: 'POST',
    body: formdata,
    headers: {
      ...finalHeaders,
    },
  });

  if (!response.ok) {
    return { status: 'failed', message: `圖片檔案上傳失敗` };
  }

  const result = (await response.json()) as IUploadImagesResult;
  return { status: 'success', data: result };
}

export type FormState =
  | {
      message: string;
      fields?: Record<string, string>;
      issues?: Partial<ZodError<z.infer<typeof createActivityFormSchema>>>;
    }
  | undefined;

// Function to flatten the data into a string-based record
function flattenData(
  data: Record<string, any>,
  prefix = ''
): Record<string, string> {
  return Object.keys(data).reduce(
    (acc, key) => {
      const value = data[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        Object.assign(acc, flattenData(value, newKey));
      } else {
        acc[newKey] = value?.toString() || '';
      }

      return acc;
    },
    {} as Record<string, string>
  );
}

type FormDataObject = { [key: string]: string | File };

function formDataToNestedObject(formData: FormDataObject): any {
  const result: any = {};

  Object.entries(formData).forEach(([key, value]) => {
    const keys = key.split('.');
    keys.reduce((acc, part, index) => {
      if (index === keys.length - 1) {
        acc[part] = value;
      } else {
        acc[part] =
          acc[part] || (Number.isNaN(Number(keys[index + 1])) ? {} : []);
      }
      return acc[part];
    }, result);
  });

  return result;
}

export async function uploadActivity(
  prevSate: FormState,
  data: FormData
): Promise<FormState> {
  console.log(data);

  const formDataObject: FormDataObject = Object.fromEntries(data);
  const nestedData = formDataToNestedObject(formDataObject);
  const parsed = createActivityFormSchema.safeParse(nestedData);

  if (!parsed.success) {
    return {
      message: 'Invalid form data',
      fields: flattenData(formDataObject),
      issues: parsed.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: `伺服器驗證錯誤訊息: ${issue.message}`,
      })),
    };
  }
  // if (parsed.data.name.includes('a')) {
  //   return {
  //     message: "We Don't like Alexendar Hamilton.",
  //     fields: flattenData(parsed.data),
  //   };
  // }

  const { organizer } = parsed.data;
  const { name } = organizer;

  const response = await fetchAPI({
    api: '/auth/activities',
    method: 'POST',
    data: parsed.data,
    shouldAuth: true,
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  const result = await response.json();

  console.log(result);
  const activityId = result._id;
  const userID = result.creatorId;

  if (result) {
    return { message: `Welcome, ${activityId} ${userID || ''}!` };
  }
  revalidatePath('/activity/new');
  // redirect(`/activity/preview?id=${activityId}&userID=${userID}`);
  return { message: `Welcome, ${name}!` };
}
