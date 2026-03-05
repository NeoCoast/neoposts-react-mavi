import { BiSolidComment } from 'react-icons/bi';

import CommentComponent from '@/components/Comment';
import { PostComment } from '@/ts/interfaces';

type PostDetailCommentsProps = {
  commentsCount: number;
  comments: PostComment[];
};

const PostDetailComments = ({ commentsCount, comments }: PostDetailCommentsProps) => {
  return (
    <section className="post__detail-comments">
      <div className="post__detail-comments-header">
        <BiSolidComment />
        <span>{commentsCount} comments</span>
      </div>

      <div className="post__detail-comments-list">
        {commentsCount === 0 ? (
          <p className="post__detail-comments-list-empty">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <CommentComponent key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </section>
  );
};

export default PostDetailComments;
