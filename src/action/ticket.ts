'use server';

import { fetchAPI } from './utils';

export type TicketsAPIResponse = {
  status: string;
  data?: TicketsInfoType;
  message?: string;
};

export type TicketsAndPage = {
  data: TicketsInfoType[];
  page: number;
  total: number;
};

export type TicketsInfoType = {
  [x: string]: any;
  orderContact: UserType;
  payment: PaymentType;
  _id: string;
  activity: ActivityType;
  ticket: TicketType;
  orderStatus: string;
  transactionId: string;
  serialNumber: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

export type UserType = {
  name: string;
  email: string;
  phone: string;
};

export type PaymentType = {
  amount: string;
  status: string;
  type: string;
  orderNumber: number;
};

export type ActivityType = {
  _id: string;
  name: string;
  organizer: OrganizerType;
  cover: string[];
  thumbnail: string;
  startDateTime: string;
  fromToday: boolean;
  endDateTime: string;
  noEndDate: boolean;
  category: string;
  type: string;
  link: string;
  location: string;
  address: string;
  summary: string;
  details: string;
  isPrivate: false;
  displayRemainingTickets: boolean;
  remainingTickets: number;
  isRecurring: boolean;
  status: string;
  lat: number;
  lng: number;
  saved: boolean;
  participated: boolean;
  totalParticipantCapacity: number;
  unlimitedQuantity: boolean;
  __v: boolean;
  createdAt: string;
  updatedAt: string;
};

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
  __v: number;
};

export type TicketType = {
  _id: string;
  activityId: string;
  name: string;
  price: number;
  startDateTime: string;
  fromToday: boolean;
  endDateTime: string;
  noEndDate: boolean;
  participantCapacity: number;
  soldNumber: number;
  unlimitedQuantity: boolean;
  purchaseLimit: number;
  description: string;
  purchaseDuplicate: boolean;
  ticketStatus: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

export async function getTickets(): Promise<TicketsAPIResponse> {
  try {
    const response = await fetchAPI({
      api: `/auth/orders`,
      method: 'GET',
      shouldAuth: true,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return {
        status: 'failed',
        message: errorMessage,
      };
    }

    const fetchedData = await response.json();
    return {
      status: 'success',
      data: fetchedData,
    };
  } catch (error) {
    return {
      status: 'failed',
      message: `${error}`,
    };
  }
}
