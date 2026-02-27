import { useState, useEffect } from 'react';
import cn from 'classnames';
import { BiSolidComment } from 'react-icons/bi';

import { useLikePostMutation, useUnlikePostMutation } from '@/services/api';
import type { PostFooterProps } from '@/ts/interfaces';

import Button from '@/components/Button';
import LikeButton from '@/components/LikeButton';
import Tooltip from '@/components/Tooltip';
import { notify } from '@/components/Toaster/notify';
import CommentModal from '@/components/CommentModal';

import './styles.scss';

const PostFooter = ({
  postId,
  liked,
  publishedAt,
  likesCount,
  commentsCount,
  label,
  canLike,
  canComment,
  onCommentCreated,
}: PostFooterProps) => {
  const [likePost, { isLoading: isLiking }] = useLikePostMutation();
  const [unlikePost, { isLoading: isUnliking }] = useUnlikePostMutation();
  const isLoading = isLiking || isUnliking;

  const [likesCountLocal, setLikesCountLocal] = useState(likesCount ?? 0);
  const [commentsCountLocal, setCommentsCountLocal] = useState(commentsCount ?? 0);

  const parsedDate = new Date(publishedAt);
  const isValidDate = !Number.isNaN(parsedDate.getTime());
  const formattedDate = isValidDate ? parsedDate.toLocaleString() : publishedAt;
  const displayDate = label ?? formattedDate;

  useEffect(() => {
    setLikesCountLocal(likesCount ?? 0);
  }, [likesCount]);

  useEffect(() => {
    setCommentsCountLocal(commentsCount ?? 0);
  }, [commentsCount]);

  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const handleLikeClick = async () => {
    if (!canLike || isLoading) {
      return;
    }
    try {
      if (liked) {
        await unlikePost(Number(postId));
      } else {
        await likePost(Number(postId));
      }
    } catch (error) {
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
          isLiked={liked}
          count={likesCountLocal}
          disabled={isLoading || !canLike}
          canLike={!!canLike}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleLikeClick();
          }}
        />

        <Tooltip content={canComment ? '' : 'You need to follow the user to comment their posts'}>
          <Button
            variant="icon"
            className={cn('post__footer-icons-comment', { 'disabled-comment': !canComment })}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!canComment) return;
              setIsCommentOpen(true);
            }}
            disabled={!canComment}
          >
            <BiSolidComment />
            <span className="post__footer-count">{commentsCountLocal}</span>
          </Button>
        </Tooltip>
      </div>
      {isCommentOpen && (
        <CommentModal
          isOpen={isCommentOpen}
          closeModal={() => setIsCommentOpen(false)}
          postId={postId}
          onSuccess={(comment) => {
            setCommentsCountLocal((c) => c + 1);
            if (onCommentCreated) onCommentCreated(comment);
          }}
        />
      )}
    </footer>
  );
};

export default PostFooter;
