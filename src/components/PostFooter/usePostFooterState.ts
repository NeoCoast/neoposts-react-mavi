import { MouseEvent, useCallback, useEffect, useState } from 'react';

import { useLikePostMutation, useUnlikePostMutation } from '@/services/api';

import { notify } from '@/components/Toaster/notify';

type UsePostFooterStateProps = {
  postId: string | number;
  liked: boolean;
  likesCount: number;
  commentsCount: number;
  publishedAt: string;
  label?: string;
  canLike: boolean;
};

const usePostFooterState = ({
  postId,
  liked,
  likesCount,
  commentsCount,
  publishedAt,
  label,
  canLike,
}: UsePostFooterStateProps) => {
  const [likePost, { isLoading: isLiking }] = useLikePostMutation();
  const [unlikePost, { isLoading: isUnliking }] = useUnlikePostMutation();
  const isLoading = isLiking || isUnliking;

  const [isLiked, setIsLiked] = useState(liked);
  const [likesCountLocal, setLikesCountLocal] = useState(likesCount ?? 0);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentsCountLocal, setCommentsCountLocal] = useState(commentsCount ?? 0);
  const [likedLocal, setLikedLocal] = useState<boolean>(liked ?? false);

  const parsedDate = new Date(publishedAt);
  const isValidDate = !Number.isNaN(parsedDate.getTime());
  const formattedDate = isValidDate ? parsedDate.toLocaleString() : publishedAt;
  const displayDate = label ?? formattedDate;

  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  useEffect(() => {
    setLikesCountLocal(likesCount ?? 0);
  }, [likesCount]);

  useEffect(() => {
    setCommentsCountLocal(commentsCount ?? 0);
  }, [commentsCount]);

  useEffect(() => {
    setLikedLocal(liked ?? false);
  }, [liked]);

  const handleLikeClick = useCallback(async () => {
    if (!canLike || isLoading) return;

    const prevCount = likesCountLocal;
    const nextLiked = !likedLocal;
    const nextCount = nextLiked ? prevCount + 1 : Math.max(0, prevCount - 1);

    setLikedLocal(nextLiked);
    setLikesCountLocal(nextCount);

    try {
      if (nextLiked) {
        await likePost(Number(postId));
      } else {
        await unlikePost(Number(postId));
      }
    } catch (err) {
      setLikedLocal(likedLocal);
      setLikesCountLocal(prevCount);
      notify.error('An error occurred while updating your like. Please try again.');
    }
  }, [canLike, isLoading, likedLocal, likesCountLocal, likePost, unlikePost, postId]);

  const handleCommentButtonClick = (e: MouseEvent<HTMLButtonElement>, canComment: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    if (!canComment) return;
    setIsCommentOpen(true);
    e.currentTarget?.blur();
  };

  const closeCommentModal = () => {
    setIsCommentOpen(false);
  };

  const incrementComments = () => {
    setCommentsCountLocal((c) => c + 1);
  };

  return {
    isLoading,
    displayDate,
    likedLocal,
    likesCountLocal,
    commentsCountLocal,
    isCommentOpen,
    handleLikeClick,
    handleCommentButtonClick,
    closeCommentModal,
    incrementComments,
  } as const;
};

export default usePostFooterState;
