import { useState, useEffect } from 'react';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { BiSolidComment } from 'react-icons/bi';

import { useLikePostMutation, useUnlikePostMutation } from '@/services/api';
import type { PostFooterProps } from '@/ts/interfaces';

import Button from '@/components/Button';
import { notify } from '@/components/Toaster/notify';
import Tooltip from '@/components/Tooltip';

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
  const isLoading = isLiking || isUnliking;

  const [isLiked, setIsLiked] = useState(liked);
  const [likesCountLocal, setLikesCountLocal] = useState(likesCount ?? 0);

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
    if (!canLike) {
      return;
    }

    if (isLoading) return;

    const previousLiked = isLiked;
    const previousLikes = likesCountLocal;

    setIsLiked(!previousLiked);
    setLikesCountLocal(previousLiked ? previousLikes - 1 : previousLikes + 1);

    try {
      if (previousLiked) {
        await unlikePost(Number(postId)).unwrap();
      } else {
        await likePost(Number(postId)).unwrap();
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
        {!canLike ? (
          <Tooltip content={"You need to follow the user to like their posts"}>
            <span>
              <Button
                variant="icon"
                className={`post__footer-icons-heart 
                  ${isLiked ? 'liked' : ''} 
                  ${!canLike ? 'disabled-like' : ''}
                `}
                disabled={isLoading || !canLike}
                aria-pressed={isLiked}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleLikeClick();
                }}
              >
                {isLiked ? <IoIosHeart /> : <IoIosHeartEmpty />}
                <span className="post__footer-count">{likesCountLocal}</span>
              </Button>
            </span>
          </Tooltip>
        ) : (
          <Button
            variant="icon"
            className={`post__footer-icons-heart 
              ${isLiked ? 'liked' : ''} 
              ${!canLike ? 'disabled-like' : ''}
            `}
            disabled={isLoading || !canLike}
            aria-pressed={isLiked}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleLikeClick();
            }}
          >
            {isLiked ? <IoIosHeart /> : <IoIosHeartEmpty />}
            <span className="post__footer-count">{likesCountLocal}</span>
          </Button>
        )}

        <Button
          variant="icon"
          className="post__footer-icons-comment"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <BiSolidComment />
          {hasComments && <>{commentsCount}</>}
        </Button>
      </div>
    </footer>
  );
};

export default PostFooter;
