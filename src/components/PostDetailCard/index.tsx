import { IoIosArrowBack } from 'react-icons/io';
import { BiSolidComment } from 'react-icons/bi';

import PostTitle from '@/components/PostTitle';
import PostContent from '@/components/PostContent';
import PostFooter from '@/components/PostFooter';
import CommentComponent from '@/components/Comment';
import Button from '@/components/Button';

import { PostComment, PostListItem } from '@/ts/interfaces';
import { getFullName } from '@/utils/postUtils';

import userProfilePlaceholder from '@/assets/Icons/userProfilePhoto.svg';

import './styles.scss';

type PostDetailCardProps = {
  post: PostListItem;
  postContent: string;
  likesCount: number;
  comments: PostComment[];
  commentsCount: number;
  publishedAtRaw: string;
  publishedAtLabel: string;
  onBack: () => void;
};

function PostDetailCard({
  post,
  postContent,
  likesCount,
  comments,
  commentsCount,
  publishedAtRaw,
  publishedAtLabel,
  onBack,
}: PostDetailCardProps) {
  const authorFullName = getFullName(post.author.name, post.author.lastName);
  const authorAlt = authorFullName || 'Author avatar';
  const authorEmail = post.author.email ?? 'email unavailable';
  const authorDisplayName = authorFullName || 'Unknown Author';

  return (
    <article className="post__detail-card">
      <Button
        variant='icon'
        className="post__detail-card-back"
        aria-label="Back"
        onClick={onBack}
        title={
          <>
            <IoIosArrowBack />
            <span>Back</span>
          </>
        }
      />
      <header className="post__detail-card-header">
        <img
          className="post__detail-card-header-avatar"
          src={post.author.profilePhoto || userProfilePlaceholder}
          alt={authorAlt}
        />

        <div className="post__detail-card-header-author">
          <h2 className="post__detail-card-header-author-name">{authorDisplayName}</h2>
          <p className="post__detail-card-header-author-email">{authorEmail}</p>
        </div>
      </header>

      <PostTitle title={post.title} />
      <PostContent content={postContent} />

      <PostFooter
        publishedAt={publishedAtRaw || post.publishedAt}
        likesCount={likesCount}
        commentsCount={commentsCount}
        label={publishedAtLabel}
      />

      <span className="post__detail-card-separator" />

      <section className="post__detail-comments">
        <div className="post__detail-comments-header">
          <BiSolidComment />
          <span>{commentsCount} comments</span>
        </div>

        <div className="post__detail-comments-list">
          {comments.length === 0 ? (
            <p className="post__detail-comments-list-empty">No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <CommentComponent key={comment.id} comment={comment} />
            ))
          )}
        </div>
      </section>
    </article>
  );
}

export default PostDetailCard;
