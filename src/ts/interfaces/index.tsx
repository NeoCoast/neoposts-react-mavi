import { ChangeEvent } from 'react';
import { UseFormRegister, type FieldError } from 'react-hook-form';

export interface User {
  id: string | number;
  name: string;
  email: string;
  posts: PostListItem[];
  followers: UserData[];
  followees: UserData[];
  followed?: boolean;
}

export interface UserData {
  id: string | number;
  name: string;
  email: string;
  profilePhoto?: string;
  followed?: boolean;
}

export interface Profile {
  name: string;
  email: string;
  posts: number;
  followees: number;
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
  body: string;
  publishedAt: string;
  likesCount?: number;
  commentsCount?: number;
  comments?: PostComment[];
}

export type Author = UserData;

export interface PostListItem extends Post {
  author: Author;
}

export interface PostDetailLocationState {
  post?: PostListItem;
  from?: string;
}

export interface PostDetailRouteParams extends Record<string, string | undefined> {
  id?: string;
}

export interface PostProps {
  post: Post;
  showContent?: boolean;
}

export interface PostsListProps {
  items: PostListItem[];
  fetchMore: VoidFunction;
  hasMore: boolean;
  loadedCount: number;
  totalCount?: number;
  pageError?: string | null;
  onRetry: VoidFunction;
  showContent?: boolean;
}

export interface AuthorDetailsProps {
  name?: Author['name'];
  email?: Author['email'];
  profilePhoto?: Author['profilePhoto'];
}

export interface PostTitleProps {
  name?: Author['name'];
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
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  followees: number;
  followers: number;
};

export interface CreateModalProps {
  isOpen: boolean;
  closeModal: VoidFunction;
};

export interface CreatePostFormData {
  title: string;
  body: string;
};

export interface ModalProps {
  isOpen: boolean;
  closeModal: VoidFunction;
};

export interface FormData {
  title?: string;
  body: string;
};

export interface CreatePostProps {
  isOpen: boolean;
  closeModal: VoidFunction;
}

export interface SearchBarProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: VoidFunction;
  placeholder?: string;
  ariaLabel?: string;
  inputName?: string;
  wrapperClass?: string;
  debouncedSearch?: string;
  setDebouncedSearch?: (value: string) => void;
}
