import React from 'react';
import cn from 'classnames';
import { GoHeart, GoHeartFill } from 'react-icons/go';

import Button from '@/components/Button';
import Tooltip from '@/components/Tooltip';

type LikeButtonProps = {
  isLiked: boolean;
  count: number;
  disabled?: boolean;
  canLike: boolean;
  onClick: (e: React.MouseEvent) => void;
};

const LikeButton = ({ isLiked, count, disabled, canLike, onClick }: LikeButtonProps) => {
  const content = (
    <Button
      variant="icon"
      className={cn('post__footer-icons-heart', { liked: isLiked }, { 'disabled-like': !canLike })}
      disabled={disabled}
      aria-pressed={isLiked}
      onClick={onClick}
    >
      {isLiked ? (
        <GoHeartFill className="icon-heart-filled" aria-hidden="false" />
      ) : (
        <GoHeart className="icon-heart-empty" aria-hidden="false" />
      )}
      <span className="post__footer-count">{count}</span>
    </Button>
  );

  if (!canLike) {
    return <Tooltip content={"You need to follow the user to like their posts"}>{content}</Tooltip>;
  }

  return <>{content}</>;
};

export default LikeButton;
