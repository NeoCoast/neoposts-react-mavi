import { PostComment } from '@/ts/interfaces';

export const formatRelativeDate = (value?: string) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });
};

export const getFullName = (name?: string | null): string => {
  return [name].filter(Boolean).join(' ').trim();
};

export const formatAuthorName = (author: PostComment['author']): string => {
  const base = [author.name].filter(Boolean).join(' ').trim();
  if (base) return base;
  if (author.name) return author.name;
  if (author.email) return author.email.split('@')[0];
  return 'Unknown';
};
