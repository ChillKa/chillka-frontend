export interface CommentType {
  _id: string;
  userName: string;
  profilePicture: string;
  activityName: string;
  date: string;
  content: string;
}

export interface CommentsDataType {
  comments: Array<CommentType>;
  total: number;
}
