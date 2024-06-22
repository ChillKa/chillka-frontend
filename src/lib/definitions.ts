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

export const userCommentSchema = z.object({
  content: z.string().min(1, { message: MIN_LENGTH_MESSAGE(1) }),
});

export const organizerSchema = z.object({
  profilePicture: z.string(),
  name: z.string(),
  contactName: z.string(),
  contactPhone: z.string(),
  contactEmail: z.string().email(),
  websiteName: z.string(),
  websiteURL: z.string().url(),
  _id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const recurringSchema = z.object({
  period: z.string(),
  week: z.string(),
  day: z.string(),
});

export const activitySchema = z.object({
  startDateTime: z.string(),
  endDateTime: z.string(),
  organizer: organizerSchema,
  name: z.string(),
  cover: z.array(z.string().url()),
  thumbnail: z.string().url(),
  category: z.string(),
  type: z.string(),
  link: z.string().url(),
  location: z.string(),
  address: z.string(),
  summary: z.string(),
  details: z.string(),
  isRecurring: z.boolean(),
  recurring: recurringSchema.optional(),
  _id: z.string(),
  creatorId: z.string(),
  fromToday: z.boolean(),
  noEndDate: z.boolean(),
  isPrivate: z.boolean(),
  displayRemainingTickets: z.boolean(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  lat: z.number(),
  lng: z.number(),
  saved: z.boolean().optional(),
  participated: z.boolean().optional(),
  unlimitedQuantity: z.boolean(),
  remainingTickets: z.number(),
  totalParticipantCapacity: z.number(),
  __v: z.number(),
});

export const ticketSchema = z.object({
  _id: z.string(),
  activityId: z.string(),
  name: z.string(),
  price: z.number(),
  startDateTime: z.string(),
  endDateTime: z.string(),
  fromToday: z.boolean(),
  noEndDate: z.boolean(),
  participantCapacity: z.number(),
  unlimitedQuantity: z.boolean(),
  purchaseLimit: z.number(),
  description: z.string(),
  purchaseDuplicate: z.boolean(),
  ticketStatus: z.string(),
  __v: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  soldNumber: z.number(),
});

export const replySchema = z.object({
  _id: z.string(),
  activityId: z.string(),
  userId: z.string(),
  questionId: z.string(),
  displayName: z.string(),
  type: z.string(),
  content: z.string(),
  replies: z.array(z.unknown()).default([]),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
});

export const questionSchema = z.object({
  replies: z.array(replySchema),
  _id: z.string(),
  activityId: z.string(),
  userId: z.string(),
  displayName: z.string(),
  type: z.string(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
});

export const acitivityResponseSchema = z.object({
  activity: activitySchema,
  tickets: z.array(ticketSchema),
  questions: z.array(questionSchema),
});
