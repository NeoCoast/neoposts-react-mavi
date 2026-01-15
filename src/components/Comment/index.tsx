import { IoIosHeartEmpty } from 'react-icons/io';

import { PostComment } from '@/ts/interfaces';
import {
  formatAuthorName,
  formatMention,
  formatRelativeDate,
  getFullName,
} from '@/utils/postUtils';

import userProfilePlaceholder from '@/assets/Icons/userProfilePhoto.svg';

type CommentComponentProps = {
  comment: PostComment;
};

const CommentComponent = ({ comment }: CommentComponentProps) => {
  const commentFullName = getFullName(comment.author.name, comment.author.lastName);
  const commentAlt = commentFullName || 'Comment author';
  const mention = formatMention(comment.author);

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
          {mention && (
            <span className="post__detail-list-comment-mention">@{mention}</span>
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
        <p className="post__detail-list-comment-content">{comment.content}</p>
        <div className="post__detail-list-comment-actions">
          <button type="button" className="post__detail-list-comment-actions-like">
            <IoIosHeartEmpty />
            <span>{comment.likesCount}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default CommentComponent;
