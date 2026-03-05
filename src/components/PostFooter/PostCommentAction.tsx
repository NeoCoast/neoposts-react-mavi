import { MouseEvent } from 'react';
import cn from 'classnames';
import { BiSolidComment } from 'react-icons/bi';

import Button from '@/components/Button';
import Tooltip from '@/components/Tooltip';

type PostCommentActionProps = {
  canComment: boolean;
  commentsCount: number;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

const PostCommentAction = ({ canComment, commentsCount, onClick }: PostCommentActionProps) => {
  const button = (
    <Button
      variant="icon"
      className={cn('post__footer-icons-comment', { 'disabled-comment': !canComment })}
      onClick={onClick}
      disabled={!canComment}
    >
      <BiSolidComment />
      <span className="post__footer-count">{commentsCount}</span>
    </Button>
  );

  if (!canComment) {
    return <Tooltip content="You need to follow the user to comment their posts">{button}</Tooltip>;
  }

  return button;
};

export default PostCommentAction;
