import { PostComment } from '@/ts/interfaces';
import { formatAuthorName } from '@/utils/postUtils';
import AuthorDetails from '@/components/Post/AuthorDetails';

import userProfilePlaceholder from '@/assets/Icons/userProfilePhoto.svg';

import './styles.scss';

type CommentComponentProps = {
  comment: PostComment;
};

const CommentComponent = ({ comment }: CommentComponentProps) => (
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

export default CommentComponent;
