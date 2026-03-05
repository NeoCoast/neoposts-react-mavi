import { IoIosHeartEmpty } from 'react-icons/io';

import { PostComment } from '@/ts/interfaces';
import {
  formatAuthorName,
  getFullName,
} from '@/utils/postUtils';
import Button from '@/components/Button';
import AuthorDetails from '@/components/Post/AuthorDetails';

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
      <AuthorDetails
        name={formatAuthorName(comment.author)}
        email={comment.author.email}
        profilePhoto={comment.author.profilePhoto || userProfilePlaceholder}
        className="post__detail-list-comment-author"
      />
      <div className="post__detail-list-comment-body">
        <p className="post__detail-list-comment-content">
          {comment.comment}
        </p>
      </div>
    </article>
  );
};

export default CommentComponent;
