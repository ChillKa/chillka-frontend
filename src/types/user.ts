export type UserData = {
  _id: string;
  displayName: string;
  email: string;
  realName: string;
  birthday: string;
  gender: '男' | '女';
  age: number;
  introduction: string;
  phoneNumber: string;
  address: string;
  isEmailValidate: boolean;
  savedActivities: string[];
  favoriteCategories: string[];
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
};

export type Coordinates = {
  lat: number;
  lng: number;
};
