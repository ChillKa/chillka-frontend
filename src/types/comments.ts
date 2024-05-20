export interface CommentType {
  id: string;
  participant: string;
  profilePicture: string;
  name: string;
  date: string;
  content: string;
}

export interface CommentsDataType {
  comments: Array<CommentType>;
  total: number;
}
