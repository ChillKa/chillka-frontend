export enum MessageUserType {
  HOST = '舉辦者',
  PARTICIPANT = '參加者',
}

export interface MessageDetail {
  _id: string;
  userType: MessageUserType;
  content: string;
  receiverIsRead: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserInfo {
  _id: string;
  displayName: string;
  profilePicture: string;
}

export interface Message {
  _id: string;
  orderId: string;
  hostUserId: string;
  participantUserId: string;
  host: UserInfo;
  participant: UserInfo;
  messages: MessageDetail;
  createdAt: string;
  updatedAt: string;
}
export interface MessageListResult {
  data: Message[];
  page: number;
  total: number;
}

export interface MessageHistory extends Omit<Message, 'messages'> {
  activity: { _id: string; name: string };
  messages: MessageDetail[];
}
