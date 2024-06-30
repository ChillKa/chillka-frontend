import { z } from 'zod';

export const endpoint = process.env.API_ENDPOINT;
export const REQUIRED_FIELD_MESSAGE = '此欄位為必填';
export const MAX_LENGTH_MESSAGE = (length: number) =>
  `最多不得超過${length}個字元`;
export const MIN_LENGTH_MESSAGE = (length: number) => `最少需要${length}個字元`;
export const VALID_EMAIL_MESSAGE = '請輸入有效的電子郵件地址';

export type FormState =
  | {
      status?: 'success' | 'failed';
      message: string;
      fields?: Record<string, string>;
      issues?: string[];
    }
  | undefined;

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: REQUIRED_FIELD_MESSAGE })
    .max(50, { message: MAX_LENGTH_MESSAGE(50) })
    .email({ message: VALID_EMAIL_MESSAGE }),
  password: z
    .string()
    .min(8, { message: MIN_LENGTH_MESSAGE(8) })
    .max(50, { message: MAX_LENGTH_MESSAGE(50) }),
});

export const registerFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: REQUIRED_FIELD_MESSAGE })
    .max(50, { message: MAX_LENGTH_MESSAGE(50) })
    .email({ message: VALID_EMAIL_MESSAGE }),
  password: z
    .string()
    .min(8, { message: MIN_LENGTH_MESSAGE(8) })
    .max(50, { message: MAX_LENGTH_MESSAGE(50) }),
  confirmPassword: z
    .string()
    .min(8, { message: MIN_LENGTH_MESSAGE(8) })
    .max(50, { message: MAX_LENGTH_MESSAGE(50) }),
  displayName: z
    .string()
    .min(2, { message: MIN_LENGTH_MESSAGE(2) })
    .max(50, { message: MAX_LENGTH_MESSAGE(50) }),
});

export const forgotPasswordFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: REQUIRED_FIELD_MESSAGE })
    .max(50, { message: MAX_LENGTH_MESSAGE(50) })
    .email({ message: VALID_EMAIL_MESSAGE }),
});

export const resetPasswordFormSchema = z.object({
  password: z
    .string()
    .min(8, { message: MIN_LENGTH_MESSAGE(8) })
    .max(50, { message: MAX_LENGTH_MESSAGE(50) }),
  confirmPassword: z
    .string()
    .min(8, { message: MIN_LENGTH_MESSAGE(8) })
    .max(50, { message: MAX_LENGTH_MESSAGE(50) }),
});

export const userFormSchema = z.object({
  displayName: z
    .string()
    .min(2, { message: MIN_LENGTH_MESSAGE(2) })
    .max(50, { message: MAX_LENGTH_MESSAGE(50) }),
});

export const createActivityFormSchema = z
  .object({
    name: z
      .string({ required_error: '請填寫活動名稱' })
      .min(1, '請至少填寫一個字的名稱'),
    organizer: z.object({
      profilePicture: z.union([z.string().url().optional(), z.literal('')]),
      name: z
        .string({
          required_error: '請填寫主辦方名稱',
        })
        .min(1, '請至少填寫一個字的名稱'),
      contactName: z
        .string({
          required_error: '請填寫聯絡人姓名',
        })
        .min(1, '請至少填寫一個字的名稱'),
      contactPhone: z
        .string({
          required_error: '請填寫聯絡人電話',
        })
        .min(1, '請輸入電話號碼')
        .regex(
          /^([+]?[s0-9]+)?(d{3}|[(]?[0-9]+[)])?([-]?[s]?[0-9])+$/,
          '請輸入正確的電話號碼'
        ),
      contactEmail: z
        .string({
          required_error: '請填寫聯絡人電子郵件',
        })
        .email('請輸入正確的email'),
      websiteName: z.union([
        z.string().min(1, '請至少填寫一個字的名稱').optional(),
        z.literal(''),
      ]),
      websiteURL: z.union([z.string().url('請輸入正確網址'), z.literal('')]),
    }),
    cover: z
      .array(z.string().url({ message: '請至少上傳一張有效的圖片' }))
      .nonempty({ message: '請至少上傳一張有效的圖片' }),
    thumbnail: z.string().url('請上傳一張縮圖'),
    startDateTime: z.preprocess(
      (val) => (val === '' ? undefined : new Date(`${val}`)),
      z
        .date({
          errorMap: (issue, { defaultError }) => ({
            message:
              issue.code === 'invalid_date'
                ? '請設定開始日期與時間'
                : defaultError,
          }),
        })
        .optional()
    ),
    fromToday: z.preprocess(
      (val) => val === 'true',
      z.boolean({
        required_error: 'FromToday is required',
      })
    ),
    endDateTime: z.preprocess(
      (val) => (val === '' ? undefined : new Date(val as string)),
      z
        .date({
          errorMap: (issue, { defaultError }) => ({
            message:
              issue.code === 'invalid_date'
                ? '請設定結束日期與時間'
                : defaultError,
          }),
        })
        .optional()
    ),
    noEndDate: z.preprocess(
      (val) => val === 'true',
      z.boolean({
        required_error: 'NoEndDate is required',
      })
    ),
    category: z
      .string()
      .refine(
        (value) =>
          [
            '戶外踏青',
            '社交活動',
            '興趣嗜好',
            '運動健身',
            '健康生活',
            '科技玩物',
            '藝術文化',
            '遊戲',
          ].includes(value),
        {
          message: '請選擇活動類型',
        }
      ),
    type: z.string({ required_error: '請選擇活動形式' }),
    link: z.union([z.string().url('請輸入正確網址'), z.literal('')]),
    location: z
      .string()
      .optional()
      .refine(
        (value) =>
          value
            ? ['北部', '中部', '南部', '東部', '離島'].includes(value)
            : true,
        {
          message: '請選擇活動地點',
        }
      ),
    address: z.string().optional(),
    summary: z
      .string({ required_error: '請填寫活動摘要' })
      .min(4, { message: '請至少填寫四個字以上' }),
    details: z
      .string({ required_error: '請填寫活動詳情' })
      .min(20, { message: '請至少填寫20個字以上' }),
    isPrivate: z.coerce.boolean({ required_error: 'IsPrivate is required' }),
    displayRemainingTickets: z.coerce.boolean({
      required_error: 'DisplayRemainingTickets is required',
    }),
    isRecurring: z.coerce.boolean({
      required_error: 'IsRecurring is required',
    }),
    recurring: z
      .object({
        period: z.string(),
        week: z.string(),
        day: z.string(),
      })
      .optional(),
    status: z.string({ required_error: 'Status is required' }).optional(),
    lat: z.coerce.number().optional(),
    lng: z.coerce.number().optional(),
    tickets: z.array(
      z.object({
        _id: z.string().optional(), // optional for edit activity
        name: z.string({ required_error: '請填寫票卷名稱' }),
        price: z.number({ required_error: '請輸入票卷價格' }),
        startDateTime: z.preprocess(
          (val) => (val === '' ? '' : new Date(val as string)),
          z
            .date({
              errorMap: (issue, { defaultError }) => ({
                message:
                  issue.code === 'invalid_date'
                    ? '請設定開始日期與時間'
                    : defaultError,
              }),
            })
            .optional()
            .or(z.literal(''))
        ),
        fromToday: z.preprocess(
          (val) => val === 'true',
          z.boolean({ required_error: 'FromToday is required' })
        ),
        endDateTime: z.preprocess(
          (val) => (val === '' ? '' : new Date(val as string)),
          z
            .date({
              errorMap: (issue, { defaultError }) => ({
                message:
                  issue.code === 'invalid_date'
                    ? '請設定結束日期與時間'
                    : defaultError,
              }),
            })
            .optional()
            .or(z.literal(''))
        ),
        noEndDate: z.preprocess(
          (val) => val === 'true',
          z.boolean({
            required_error: 'NoEndDate is required',
          })
        ),
        participantCapacity: z.number({
          required_error: '請選擇參與人數',
        }),
        unlimitedQuantity: z.boolean({
          required_error: 'UnlimitedQuantity is required',
        }),
        purchaseLimit: z.number().optional(),
        description: z.string().optional(),
        purchaseDuplicate: z.boolean().optional(),
        ticketStatus: z.string().optional(),
        serialNumber: z.string().optional(),
      })
    ),
  })
  .refine(
    (data) => {
      if (!data.fromToday) {
        return (
          data.startDateTime !== undefined &&
          !Number.isNaN(data.startDateTime.getTime())
        );
      }
      return true;
    },
    {
      message: '請選擇有效的開始日期和時間',
      path: ['startDateTime'],
    }
  )
  .refine(
    (data) => {
      if (data.startDateTime && data.endDateTime) {
        return data.startDateTime < data.endDateTime;
      }
      return true;
    },
    {
      message: '開始日期和時間必須早於結束日期和時間',
      path: ['endDateTime'],
    }
  );

export const userCommentSchema = z.object({
  content: z.string().min(1, { message: MIN_LENGTH_MESSAGE(1) }),
});
