export type OrganizerType = {
  profilePicture: string;
  name: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  websiteName: string;
  websiteURL: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type RecurringType = {
  period: string;
  week: string;
  day: string;
};

export type ActivityType = {
  organizer: OrganizerType;
  name: string;
  cover: string[];
  thumbnail: string;
  category: string;
  type: string;
  link: string;
  location: string;
  address: string;
  summary: string;
  details: string;
  isRecurring: boolean;
  recurring: RecurringType;
  _id: string;
  creatorId: string;
  fromToday: boolean;
  noEndDate: boolean;
  isPrivate: boolean;
  displayRemainingTickets: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TicketType = {
  _id: string;
  activityId: string;
  name: string;
  price: number;
  fromToday: boolean;
  noEndDate: boolean;
  participantCapacity: number;
  unlimitedQuantity: boolean;
  purchaseLimit: number;
  description: string;
  purchaseDuplicate: boolean;
  ticketStatus: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

export type ReplyType = {
  _id: string;
  activityId: string;
  userId: string;
  questionId: string;
  displayName: string;
  type: string;
  content: string;
  replies: ReplyType[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type QuestionType = {
  replies: ReplyType[];
  _id: string;
  activityId: string;
  userId: string;
  displayName: string;
  type: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type ApiResponse = {
  activity: ActivityType;
  tickets: TicketType[];
  questions: QuestionType[];
};
