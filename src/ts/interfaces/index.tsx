export interface User {
  id: string | number;
  name: string;
  email: string;
  posts?: any[] | number;
  followers?: any[] | number;
  followees?: any[] | number;
  followed?: any[] | number;
}

export interface Profile {
  name: string;
  email: string;
  posts: number;
  following: number;
  followers: number;
}
