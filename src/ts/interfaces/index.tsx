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

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Post {
  id: string | number;
  title: string;
  content: string;
  publishedAt: string;
}

export interface Author {
  name?: string;
  lastName?: string;
  email?: string;
  profilePhoto?: string;
  username?: string;
}

export interface PostListItem {
  id: string | number;
  title: string;
  content: string;
  publishedAt: string;
  author: Author;
}

export interface PostProps {
  post: Post;
}

export interface PostsListProps {
  items: PostListItem[];
}

export interface AuthorDetailsProps {
  name?: Author['name'];
  lastName?: Author['lastName'];
  email?: Author['email'];
  profilePhoto?: Author['profilePhoto'];
}

export interface PostTitleProps {
  name?: Author['name'];
  lastName?: Author['lastName'];
  title: string;
}

export interface PostContentProps {
  content: string;
}

export interface PostFooterProps {
  publishedAt: string;
}
