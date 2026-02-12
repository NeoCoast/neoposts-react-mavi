import { useMemo } from 'react';

import { useGetPostQuery } from '@/services/api';
import { PostComment, PostListItem } from '@/ts/interfaces';
import {
  formatDate,
  getComments,
  getCommentsCount,
  getLikesCount,
  getPostContent,
} from '@/utils/postUtils';

type UsePostDetailDataParams = {
  id: string;
  postFromState?: PostListItem | null;
};

const buildDefaultDetails = () => ({
  content: '',
  likesCount: 0,
  comments: [] as PostComment[],
  commentsCount: 0,
  publishedAt: '',
  publishedAtRaw: '',
});

const usePostDetailData = ({ id }: UsePostDetailDataParams) => {
  const {
    data: postData,
    isLoading: queryLoading,
    error: queryError,
  } = useGetPostQuery(Number(id), {});

  const post = useMemo(() => {
    if (!postData || typeof postData !== 'object') return null;

    const asAny = postData as any;
    if (asAny.post) return asAny.post as PostListItem;
    if (Array.isArray(asAny.posts)) return (asAny.posts as PostListItem[]).find((p) => String(p.id) === String(id)) ?? null;

    return postData as PostListItem;
  }, [id, postData]);

  const details = useMemo(() => {
    if (!post) return buildDefaultDetails();

    const normalizedComments = getComments(post);

    return {
      content: getPostContent(post),
      likesCount: getLikesCount(post),
      comments: normalizedComments,
      commentsCount: getCommentsCount(post, normalizedComments),
      publishedAt: formatDate(post.publishedAt),
      publishedAtRaw: post.publishedAt ?? '',
    };
  }, [post]);

  const isLoading = queryLoading;
  const hasError = Boolean(queryError);

  return {
    post: post ?? null,
    ...details,
    isLoading,
    hasError,
    error: queryError,
  };
};

export { usePostDetailData };
