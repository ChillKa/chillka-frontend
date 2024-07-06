export interface Order {
  orderContact: {
    name: string;
    email: string;
    phone: string;
  };
  payment: {
    amount: string;
    status: string;
    type: string;
    orderNumber: number;
  };
  orderStatus: string;
  serialNumber: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  ticket: Ticket;
}

interface User {
  _id: string;
  displayName: string;
  email: string;
  realName: string;
  birthday: string;
  gender: string;
  phoneNumber: string;
  age: number;
  address: string;
  profilePicture: string;
}

interface Ticket {
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
  createdAt: string;
  updatedAt: string;
}
