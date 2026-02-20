import { IoIosHeartEmpty } from 'react-icons/io';
import { BiSolidComment } from 'react-icons/bi';

import type { PostFooterProps } from '@/ts/interfaces';

import Button from '@/components/Button';

import './styles.scss';

const PostFooter = ({ publishedAt, likesCount, commentsCount, label }: PostFooterProps) => {
  const parsedDate = new Date(publishedAt);
  const isValidDate = !Number.isNaN(parsedDate.getTime());
  const formattedDate = isValidDate ? parsedDate.toLocaleString() : publishedAt;
  const displayDate = label ?? formattedDate;
  const hasLikes = typeof likesCount === 'number';
  const hasComments = typeof commentsCount === 'number';

  return (
    <footer className="post__footer">
      <time className="post__footer-date" dateTime={publishedAt}>
        {displayDate}
      </time>

      <div className="post__footer-icons">
        <Button
          variant="icon"
          className="post__footer-icons-heart"
        >
          <span className="post__footer-button">
            <IoIosHeartEmpty />
            {hasLikes && <span className="post__footer-count">{likesCount}</span>}
          </span>
        </Button>

        <Button
          variant="icon"
          className="post__footer-icons-comment"
        >
          <span className="post__footer-button">
            <BiSolidComment />
            {hasComments && <span className="post__footer-count">{commentsCount}</span>}
          </span>
        </Button>
      </div>
    </footer>
  );
};

export default PostFooter;
