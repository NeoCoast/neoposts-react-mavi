import { useState, useEffect } from 'react';
import { BiSolidComment } from 'react-icons/bi';

import { useLikePostMutation, useUnlikePostMutation } from '@/services/api';
import type { PostFooterProps } from '@/ts/interfaces';

import Button from '@/components/Button';
import LikeButton from '@/components/LikeButton';
import { notify } from '@/components/Toaster/notify';

import './styles.scss';

const PostFooter = ({
  postId,
  liked,
  publishedAt,
  likesCount,
  commentsCount,
  label,
  canLike,
}: PostFooterProps) => {
  const [likePost, { isLoading: isLiking }] = useLikePostMutation();
  const [unlikePost, { isLoading: isUnliking }] = useUnlikePostMutation();
  const [isLiked, setIsLiked] = useState(liked);
  const [likesCountLocal, setLikesCountLocal] = useState(likesCount ?? 0);

  const isLoading = isLiking || isUnliking;

  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  useEffect(() => {
    setLikesCountLocal(likesCount ?? 0);
  }, [likesCount]);

  const parsedDate = new Date(publishedAt);
  const isValidDate = !Number.isNaN(parsedDate.getTime());
  const formattedDate = isValidDate ? parsedDate.toLocaleString() : publishedAt;
  const displayDate = label ?? formattedDate;
  const hasComments = commentsCount > 0;

  const handleLikeClick = async () => {
    if (!canLike || isLoading) {
      return;
    }

    const previousLiked = isLiked;
    const previousLikes = likesCountLocal;

    setIsLiked(!previousLiked);
    setLikesCountLocal(previousLikes + (previousLiked ? -1 : 1));

    try {
      if (previousLiked) {
        await unlikePost(Number(postId));
      } else {
        await likePost(Number(postId));
      }
    } catch (error) {
      setIsLiked(previousLiked);
      setLikesCountLocal(previousLikes);

      notify.error('An error occurred while updating your like. Please try again.');
    }
  };

  return (
    <footer className="post__footer">
      <time className="post__footer-date" dateTime={publishedAt}>
        {displayDate}
      </time>

      <div className="post__footer-icons">
        <LikeButton
          isLiked={isLiked}
          count={likesCountLocal}
          disabled={isLoading || !canLike}
          canLike={!!canLike}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleLikeClick();
          }}
        />

        <Button
          variant="icon"
          className="post__footer-icons-comment"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <BiSolidComment />
          {hasComments && commentsCount}
        </Button>
      </div>
    </footer>
  );
};

export default PostFooter;
