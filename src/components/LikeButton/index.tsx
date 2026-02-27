import type { MouseEvent } from 'react';
import cn from 'classnames';
import { GoHeart, GoHeartFill } from 'react-icons/go';

import Button from '@/components/Button';
import Tooltip from '@/components/Tooltip';

type LikeButtonProps = {
  isLiked: boolean;
  count: number;
  disabled?: boolean;
  canLike: boolean;
  onClick: (e: MouseEvent) => void;
};

const LikeButton = ({ isLiked, count, disabled, canLike, onClick }: LikeButtonProps) => {
  const Icon = isLiked ? GoHeartFill : GoHeart;

  const content = (
    <Button
      variant="icon"
      className={cn('post__footer-icons-heart', { liked: isLiked }, { 'disabled-like': !canLike })}
      disabled={disabled}
      aria-pressed={isLiked}
      onClick={onClick}
    >
      <Icon className={cn('icon-heart', { 'icon-heart--filled': isLiked })} />
      <span className="post__footer-count">{count}</span>
    </Button>
  );

  return (
    <Tooltip content={canLike ? "" : "You need to follow the user to like their posts"}>
      {content}
    </Tooltip>
  );
};

export default LikeButton;
