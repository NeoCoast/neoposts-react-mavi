import { useMemo } from 'react';

import { useGetPostsQuery } from '@/services/api';
import { PostComment, PostListItem } from '@/ts/interfaces';
import {
  extractPosts,
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

const usePostDetailData = ({ id, postFromState }: UsePostDetailDataParams) => {
  const shouldSkipQuery = Boolean(postFromState);
  const {
    data: postsData,
    isLoading: queryLoading,
    error: queryError,
  } = useGetPostsQuery(undefined, { skip: shouldSkipQuery });

  const post = useMemo(() => {
    if (postFromState) return postFromState;

    const list = extractPosts(postsData);
    return list.find((item) => String(item.id) === String(id));
  }, [id, postFromState, postsData]);

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

  const isLoading = queryLoading && !postFromState;
  const hasError = Boolean(queryError) && !postFromState;

  return {
    post: post ?? null,
    ...details,
    isLoading,
    hasError,
    error: queryError,
  };
};

export { usePostDetailData };
