import type { PostFooterProps } from '@/ts/interfaces';

import LikeButton from '@/components/LikeButton';
import CommentModal from '@/components/CommentModal';
import usePostFooterState from '@/components/PostFooter/usePostFooterState';
import PostCommentAction from '@/components/PostFooter/PostCommentAction';

import './styles.scss';

const PostFooter = ({
  postId,
  liked,
  publishedAt,
  likesCount,
  commentsCount,
  label,
  canLike,
  canComment,
  onCommentCreated,
}: PostFooterProps) => {
  const {
    isLoading,
    displayDate,
    likedLocal,
    likesCountLocal,
    commentsCountLocal,
    isCommentOpen,
    handleLikeClick,
    handleCommentButtonClick,
    closeCommentModal,
    incrementComments,
  } = usePostFooterState({
    postId,
    liked,
    likesCount,
    commentsCount,
    publishedAt,
    label,
    canLike,
  });

  return (
    <footer className="post__footer">
      <time className="post__footer-date" dateTime={publishedAt}>
        {displayDate}
      </time>

      <div className="post__footer-icons">
        <LikeButton
          isLiked={likedLocal}
          count={likesCountLocal}
          disabled={isLoading || !canLike}
          canLike={!!canLike}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleLikeClick();
          }}
        />

        <PostCommentAction
          canComment={canComment}
          commentsCount={commentsCountLocal}
          onClick={(e) => handleCommentButtonClick(e, canComment)}
        />
      </div>
      {isCommentOpen && (
        <CommentModal
          isOpen={isCommentOpen}
          closeModal={closeCommentModal}
          postId={postId}
          onSuccess={(comment) => {
            incrementComments();
            onCommentCreated?.(comment);
          }}
        />
      )}
    </footer>
  );
};

export default PostFooter;
