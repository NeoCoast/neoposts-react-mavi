import { PostComment, PostListItem } from '@/ts/interfaces';

export const getLikesCount = (post: PostListItem): number => {
  if (typeof post.likesCount === 'number') return post.likesCount;

  const raw = post as unknown as { likes_count?: number; likes?: unknown[] };
  if (typeof raw.likes_count === 'number') return raw.likes_count;
  if (Array.isArray(raw.likes)) return raw.likes.length;
  return 0;
};

export const mapComment = (comment: any): PostComment => {
  const author = comment?.author ?? comment?.user ?? {};
  const likes = comment?.likes;
  const likesCount =
    typeof comment?.likesCount === 'number'
      ? comment.likesCount
      : typeof comment?.likes_count === 'number'
        ? comment.likes_count
        : Array.isArray(likes)
          ? likes.length
          : 0;

  const generatedId =
    comment?.id ??
    globalThis.crypto?.randomUUID?.() ??
    Math.random().toString(36).slice(2);

  return {
    id: generatedId,
    content: String(comment?.content ?? ''),
    publishedAt: comment?.publishedAt ?? comment?.created_at ?? comment?.createdAt,
    likesCount,
    author: {
      name: author?.name ?? author?.first_name ?? author?.username ?? '',
      email: author?.email,
      profilePhoto: author?.profilePhoto ?? author?.profile_photo ?? author?.avatar ?? author?.image,
      username: author?.username,
    },
  } as PostComment;
};

export const getComments = (post: PostListItem): PostComment[] => {
  if (Array.isArray(post.comments)) return post.comments;

  const raw = post as unknown as { comments?: any[] };
  if (!Array.isArray(raw.comments)) return [];

  return raw.comments.map((comment) => mapComment(comment));
};

export const getCommentsCount = (post: PostListItem, comments: PostComment[]): number => {
  if (typeof post.commentsCount === 'number') return post.commentsCount;

  const raw = post as unknown as { comments_count?: number };
  if (typeof raw.comments_count === 'number') return raw.comments_count;

  return comments.length;
};

export const getPostContent = (post: PostListItem): string => {
  if (typeof post.body === 'string' && post.body.trim()) return post.body;

  const raw = post as unknown as {
    body?: unknown;
    description?: unknown;
    text?: unknown;
    attributes?: {
      content?: unknown;
      body?: unknown;
      text?: unknown;
      description?: unknown;
    };
    content_text?: unknown;
    content_html?: unknown;
  };

  const candidates = [
    raw.body,
    raw.description,
    raw.text,
    raw.content_text,
    raw.content_html,
    raw.attributes?.content,
    raw.attributes?.body,
    raw.attributes?.text,
    raw.attributes?.description,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim()) return candidate;
    if (Array.isArray(candidate)) {
      const flattened = candidate.filter((item) => typeof item === 'string').join('\n').trim();
      if (flattened) return flattened;
    }
  }

  return '';
};

export const formatDate = (value?: string) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

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
  if (author.username) return author.username;
  if (author.email) return author.email.split('@')[0];
  return 'Unknown';
};

export const formatMention = (author: PostComment['author']): string | null => {
  if (author.username) return author.username;
  if (author.email) return author.email.split('@')[0];
  return null;
};
