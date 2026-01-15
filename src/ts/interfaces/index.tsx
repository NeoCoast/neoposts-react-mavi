import { UseFormRegister } from 'react-hook-form';
import type { FieldError } from 'react-hook-form';

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

export interface PostComment {
  id: string | number;
  content: string;
  publishedAt?: string;
  likesCount?: number;
  author: Author;
}

export interface Post {
  id: string | number;
  title: string;
  content: string;
  publishedAt: string;
  likesCount?: number;
  commentsCount?: number;
  comments?: PostComment[];
}

export interface Author {
  name?: string;
  lastName?: string;
  email?: string;
  profilePhoto?: string;
  username?: string;
}

export interface PostListItem extends Post {
  author: Author;
}

export interface PostDetailLocationState {
  post?: PostListItem;
}

export interface PostDetailRouteParams extends Record<string, string | undefined> {
  id?: string;
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
  likesCount?: number;
  commentsCount?: number;
  label?: string;
}

export interface InputProps {
  inputName: string;
  type?: string;
  register?: UseFormRegister<any>;
  required?: boolean;
  errors?: FieldError | { message?: string } | null;
  className?: string;
  placeholder?: string;
};

export interface TextProps {
  inputName: string;
  register?: UseFormRegister<any>;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export interface ProfileSideBarProps {
  className?: string;
  name: string;
  email: string;
  posts: number;
  following: number;
  followers: number;
};

export interface CreateModalProps {
  isOpen: boolean;
  closeModal: () => void;
};

export interface CreatePostFormData {
  title: string;
  body: string;
};

export interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
};

export interface FormData {
  title?: string;
  body: string;
};

export interface CreatePostProps {
  isOpen?: boolean;
  closeModal?: () => void;
}
