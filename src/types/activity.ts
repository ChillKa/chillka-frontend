export interface IOrganizer {
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
}

export interface IRecurring {
  period: string;
  week: string;
  day: string;
}

export interface IActivity {
  startDateTime: string;
  endDateTime: string;
  organizer: IOrganizer;
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
  recurring?: IRecurring;
  _id: string;
  creatorId: string;
  fromToday: boolean;
  noEndDate: boolean;
  isPrivate: boolean;
  displayRemainingTickets: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  lat: number;
  lng: number;
  saved?: boolean;
  participated?: boolean;
  unlimitedQuantity: boolean;
  remainingTickets: number;
  totalParticipantCapacity: number;
  __v: number;
}

export interface ITicket {
  _id: string;
  activityId: string;
  name: string;
  price: number;
  startDateTime: string;
  endDateTime: string;
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
  soldNumber: number;
}

export interface IReply {
  _id: string;
  activityId: string;
  userId: string;
  questionId: string;
  displayName: string;
  type: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IQuestion {
  replies: IReply[];
  _id: string;
  activityId: string;
  userId: string;
  displayName: string;
  type: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IAcitivityResponse {
  activity: IActivity;
  tickets: ITicket[];
  questions: IQuestion[];
}
