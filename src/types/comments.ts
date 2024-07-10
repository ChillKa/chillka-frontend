export interface IComment {
  _id: string;
  userName: string;
  profilePicture: string;
  activityName: string;
  date: string;
  content: string;
}

export interface ICommentData {
  comments: Array<IComment>;
  total: number;
}
