'use server';

import { endpoint } from '@lib/definitions';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { fetchAPI } from './utils';

// const ActivityFormData = z.object({
//   name: z.string().min(2),
//   organizer: z.object({}),
// });

export async function uploadImage(prevState: any, formData: FormData) {
  const sessionCookie = cookies().get('session')?.value;

  if (!sessionCookie) {
    return { message: 'Please login at first' };
  }

  const image = formData.get('uploadImage');

  if (!(image instanceof Blob)) {
    throw new Error('No image to be uploaded or invalid file type');
  }

  const formdata = new FormData();
  // TODO: fix this line
  formdata.append('image', image, 'steven-kamenar-MMJx78V7xS8-unsplash.jpg');

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
    throw new Error('Upload failed');
  }

  const result = await response.json();
  // console.log(result);
  revalidatePath('/activity/new');
  return { message: 'success', ...result };
}

// const organizerSchema = z.object({
//   profilePicture: z.string().url(),
//   name: z.string(),
//   contactName: z.string(),
//   contactPhone: z.string(),
//   contactEmail: z.string().email(),
//   websiteName: z.string().optional(),
//   websiteURL: z.string().url().optional(),
// });

// const recurringSchema = z.object({
//   period: z.enum(['DAY', 'WEEK', 'MONTH', 'YEAR']),
//   week: z.enum(['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'LAST']).optional(),
//   day: z
//     .enum([
//       'MONDAY',
//       'TUESDAY',
//       'WEDNESDAY',
//       'THURSDAY',
//       'FRIDAY',
//       'SATURDAY',
//       'SUNDAY',
//     ])
//     .optional(),
// });

// const ticketSchema = z.object({
//   name: z.string(),
//   price: z.number(),
//   startDateTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
//     message: 'Invalid date format',
//   }),
//   fromToday: z.boolean(),
//   endDateTime: z
//     .string()
//     .refine((val) => !isNaN(Date.parse(val)), {
//       message: 'Invalid date format',
//     })
//     .optional(),
//   noEndDate: z.boolean(),
//   participantCapacity: z.number(),
//   unlimitedQuantity: z.boolean(),
//   purchaseLimit: z.number().optional(),
//   description: z.string().optional(),
//   purchaseDuplicate: z.boolean().optional(),
// });

// const activityFormDataSchema = z.object({
//   name: z.string(),
//   organizer: organizerSchema,
//   cover: z.array(z.string().url()),
//   thumbnail: z.string().url(),
//   startDateTime: z
//     .string()
//     .refine((val) => !isNaN(Date.parse(val)), {
//       message: 'Invalid date format',
//     })
//     .optional(),
//   fromToday: z.boolean(),
//   endDateTime: z
//     .string()
//     .refine((val) => !isNaN(Date.parse(val)), {
//       message: 'Invalid date format',
//     })
//     .optional(),
//   noEndDate: z.boolean(),
//   category: z.string(),
//   type: z.string(),
//   link: z.string().optional(),
//   location: z.string().optional(),
//   address: z.string().optional(),
//   summary: z.string(),
//   details: z.string(),
//   isPrivate: z.boolean(),
//   displayRemainingTickets: z.boolean(),
//   isRecurring: z.boolean(),
//   recurring: recurringSchema.optional(),
//   status: z.string(),
//   lat: z.string().optional(),
//   lng: z.string().optional(),
//   tickets: ticketSchema,
// });

export async function uploadActivity(formData: FormData) {
  console.log(formData);

  // const jsonExample = {
  //   name: '陽明山花卉探險：春之花海', //requried
  //   organizer: {
  //     profilePicture: 'https://loremflickr.com/640/480?lock=6438964797898752',
  //     name: 'Marian Walker', //requried
  //     contactName: 'Sarah Thiel', //requried
  //     contactPhone: '485-450-7848', //requried
  //     contactEmail: 'Nedra32@gmail.com', //requried
  //     websiteName: 'frightening-papa.com',
  //     websiteURL: 'https://colossal-fabric.biz',
  //   },
  //   cover: [
  //     'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   ], //requried
  //   thumbnail:
  //     'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=416&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', //requried
  //   startDateTime: '2024-06-18T10:00:00.000Z',
  //   fromToday: false, //requried or upper content startDateTime
  //   endDateTime: '2024-06-20T22:00:00.000Z',
  //   noEndDate: false, //requried or upper content endDateTime
  //   category: '體驗', //requried
  //   type: '線上', //requried
  //   link: '活動連結',
  //   location: '陽明山國家公園',
  //   address: '台北市士林區竹子湖路1-20號',
  //   summary: '歡迎加入我們的「探索夜空之旅」活動!', //requried
  //   details: '下午6:00 - 7:00:抵達活動地點,安排露營帳篷。', //requried
  //   isPrivate: false, //requried
  //   displayRemainingTickets: true, //requried
  //   isRecurring: true, //requried
  //   recurring: {
  //     period: 'MONTH',
  //     week: 'LAST',
  //     day: 'SUNDAY',
  //   },
  //   status: '有效', //requried
  //   lat: '25.175900',
  //   lng: '121.544200',
  //   tickets: {
  //     //requried
  //     name: '星空夜行免費入場券', //requried
  //     price: 500, //requried
  //     startDateTime: '2024-06-18T10:00:00.000Z',
  //     fromToday: false, //requried or upper content startDateTime
  //     endDateTime: '2024-06-20T22:00:00.000Z',
  //     noEndDate: false, //requried or upper content endDateTime
  //     participantCapacity: 43, //requried
  //     unlimitedQuantity: false, //requried
  //     purchaseLimit: 1,
  //     description:
  //       '這張星空冒險導覽套票包含專屬導覽、望遠鏡租借和美食饗宴，帶您進入星空的奇妙世界。',
  //     purchaseDuplicate: false,
  //   },
  // };

  const jsonExample2 = {
    name: 'Miss Kelly Dare',
    organizer: {
      profilePicture: 'https://loremflickr.com/640/480?lock=7694210111111168',
      name: 'Mr. Alan Jerde',
      contactName: 'Leona Spencer',
      contactPhone: '244.960.8178 x08518',
      contactEmail: 'Bell.Nitzsche@gmail.com',
      websiteName: 'these-human.org',
      websiteURL: 'https://peaceful-plier.org/',
    },
    cover: [
      'https://loremflickr.com/640/480?lock=445309626875904',
      'https://loremflickr.com/640/480?lock=7701584716759040',
      'https://loremflickr.com/640/480?lock=8167749635276800',
    ],
    thumbnail: 'https://loremflickr.com/640/480?lock=7914678927753216',
    startDateTIme: '2024-05-24T16:51:30.302Z',
    fromToday: false,
    endDateTIme: '2024-10-19T17:12:03.234Z',
    noEndDate: false,
    category: '藝術文化',
    type: '線上',
    link: 'https://defensive-mineshaft.net',
    location: '北部',
    address: '8412 Albany Road',
    summary: 'Bestia desidero comprehendo votum attollo aggero.',
    details:
      'Urbanus abstergo vitiosus ipsum patria coaegresco. Derideo approbo valde vigilo odit torrens curriculum ocer vitae. Degero vergo vespillo adinventitias blandior beneficium abduco.',
    isPrivate: false,
    displayRemainingTickets: false,
    isRecurring: true,
    recurring: {
      period: '每月',
      week: '每週',
      day: '星期六',
    },
    status: '有效',
    tickets: [
      {
        name: 'VIP星空露營體驗券',
        price: 1200,
        startDateTIme: '2024-03-28T00:00:30.302Z',
        fromToday: false,
        endDateTIme: '2024-03-29T00:00:03.234Z',
        noEndDate: false,
        participantCapacity: 20,
        unlimitedQuantity: false,
        purchaseLimit: 1,
        description:
          '這張星空冒險導覽套票包含專屬導覽、望遠鏡租借和美食饗宴，帶您進入星空的奇妙世界。',
        purchaseDuplicate: false,
      },
      {
        name: '星空夜行免費入場券',
        price: 500,
        startDateTIme: '2024-05-24T16:51:30.302Z',
        fromToday: false,
        endDateTIme: '2024-10-19T17:12:03.234Z',
        noEndDate: false,
        participantCapacity: 43,
        unlimitedQuantity: true,
        purchaseLimit: 1,
        description:
          '這張星空冒險導覽套票包含專屬導覽、望遠鏡租借和美食饗宴，帶您進入星空的奇妙世界。',
        purchaseDuplicate: false,
      },
    ],
  };

  // const validatedFields = activityFormDataSchema.safeParse(jsonExample2);

  // if (!validatedFields.success) {
  //   console.log(validatedFields.error);
  //   return {
  //     errors: validatedFields.error.flatten().fieldErrors,
  //   };
  // }

  const response = await fetchAPI({
    api: '/auth/activities',
    method: 'POST',
    data: jsonExample2,
    shouldAuth: true,
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  const result = await response.json();

  console.log(result);
  const activityId = result._id;
  const userID = result.creatorId;

  console.log('activityId', activityId);
  console.log('userID', userID);
  revalidatePath('/activity/new');
  // redirect(`/activity/preview?id=${activityId}&userID=${userID}`);
}
