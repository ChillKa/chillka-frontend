export interface Comment {
  id: string;
  participant: string;
  name: string;
  date: string;
  content: string;
  profilePicture: string;
}

export interface CommentsData {
  comments: Array<Comment>;
  total: number;
}
