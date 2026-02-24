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

  const details = useMemo(() => {
    if (!postData) return buildDefaultDetails();

    const normalizedComments = getComments(postData);

    return {
      content: getPostContent(postData),
      likesCount: getLikesCount(postData),
      comments: normalizedComments,
      commentsCount: getCommentsCount(postData, normalizedComments),
      publishedAt: formatDate(postData.publishedAt),
      publishedAtRaw: postData.publishedAt ?? '',
    };
  }, [postData]);

  const isLoading = queryLoading;
  const hasError = Boolean(queryError);

  return {
    post: postData ?? null,
    ...details,
    isLoading,
    hasError,
    error: queryError,
  };
};

export { usePostDetailData };
