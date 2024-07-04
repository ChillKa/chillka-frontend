export interface User {
  userId: string;
  userRealName: string;
  gender: string;
  phoneNumber: string;
  email: string;
  age: string;
  lastOnlineTime: string;
}

export interface Participant {
  user: User;
  ticketName: string;
  checkIn: boolean;
  paymentStatus: string;
  paymentAmount: string;
  paymentDate: string;
}
