export enum MessageUserType {
  HOST = '舉辦者',
  PARTICIPANT = '參加者',
}

export interface MessageDetail {
  userType: MessageUserType;
  content: string;
  receiverIsRead: boolean;
}

export interface Message {
  _id: string;
  orderId: string;
  hostUserId: string;
  participantUserId: string;
  messages: MessageDetail;
  createdAt: string;
  updatedAt: string;
}

export interface MessageListResult {
  data: Message[];
  page: number;
  total: number;
}
