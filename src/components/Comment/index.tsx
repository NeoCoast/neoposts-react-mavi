import { IoIosHeartEmpty } from 'react-icons/io';

import { PostComment } from '@/ts/interfaces';
import {
  formatAuthorName,
  formatRelativeDate,
  getFullName,
} from '@/utils/postUtils';
import Button from '@/components/Button';

import userProfilePlaceholder from '@/assets/Icons/userProfilePhoto.svg';

import './styles.scss';

type CommentComponentProps = {
  comment: PostComment;
};

const CommentComponent = ({ comment }: CommentComponentProps) => {
  const commentFullName = getFullName(comment.author.name);
  const commentAlt = commentFullName || 'Comment author';

  return (
    <article className="post__detail-list-comment">
      <img
        className="post__detail-list-comment-avatar"
        src={comment.author.profilePhoto || userProfilePlaceholder}
        alt={commentAlt}
      />
      <div className="post__detail-list-comment-body">
        <div className="post__detail-list-comment-header">
          <span className="post__detail-list-comment-name">
            {formatAuthorName(comment.author)}
          </span>
          {comment.author.email && (
            <span className="post__detail-list-comment-email">{comment.author.email}</span>
          )}
          {comment.publishedAt && (
            <time
              className="post__detail-list-comment-date"
              dateTime={comment.publishedAt}
            >
              {formatRelativeDate(comment.publishedAt)}
            </time>
          )}
        </div>
        <p className="post__detail-list-comment-content">{comment.comment}</p>
        <div className="post__detail-list-comment-actions">
          <Button
            variant="icon"
            className="post__detail-list-comment-actions-like"
          >
            <IoIosHeartEmpty />
            {comment.likesCount}
          </Button>
        </div>
      </div>
    </article>
  );
};

export default CommentComponent;
