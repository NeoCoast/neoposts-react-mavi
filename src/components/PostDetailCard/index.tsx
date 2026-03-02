import { IoIosArrowBack } from 'react-icons/io';
import { BiSolidComment } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import { useGetMeQuery } from '@/services/api';
import { ROUTES } from '@/constants/routes';
import { PostListItem } from '@/ts/interfaces';
import { getFullName } from '@/utils/postUtils';

import PostTitle from '@/components/PostTitle';
import PostContent from '@/components/PostContent';
import PostFooter from '@/components/PostFooter';
import CommentComponent from '@/components/Comment';
import Button from '@/components/Button';

import userProfilePlaceholder from '@/assets/Icons/userProfilePhoto.svg';

import './styles.scss';

type PostDetailCardProps = {
  post: PostListItem;
  onBack: () => void;
};

function PostDetailCard({
  post,
  onBack,
}: PostDetailCardProps) {
  const { data: me } = useGetMeQuery();
  const isOwnPost = me && String(me.id) === String(post.author.id);
  const isFollowing = post.author.followed ?? false;
  const canComment = Boolean(isFollowing);
  const canLike = isOwnPost || isFollowing;

  const authorFullName = getFullName(post.author.name);
  const authorAlt = authorFullName || 'Author avatar';
  const authorEmail = post.author.email ?? 'email unavailable';
  const authorDisplayName = authorFullName || 'Unknown Author';
  const authorRoute = `${ROUTES.USERS}/${post.author.id}`;
  const destination = isOwnPost ? ROUTES.MY_PROFILE : authorRoute;

  const comments = post.comments ?? [];
  const commentsCount = post.comments?.length ?? post.commentsCount ?? 0;
  const likesCount = post.likesCount ?? 0;
  const body = post.body ?? '';

  return (
    <article className="post__detail-card">
      <Button
        variant='icon'
        className="post__detail-card-back"
        aria-label="Back"
        onClick={onBack}
      >
        <IoIosArrowBack />
        Back
      </Button>
      <header className="post__detail-card-header">
        <Link to={destination} state={{ from: 'post' }} className="post__detail-card-header-link">
          <img
            className="post__detail-card-header-avatar"
            src={post.author.profilePhoto || userProfilePlaceholder}
            alt={authorAlt}
          />
          <div className="post__detail-card-header-author">
            <h2 className="post__detail-card-header-author-name">{authorDisplayName}</h2>
            <p className="post__detail-card-header-author-email">{authorEmail}</p>
          </div>
        </Link>
      </header>

      <PostTitle title={post.title} />
      <PostContent content={body} />
      <PostFooter
        postId={post.id}
        liked={post.liked}
        likesCount={likesCount}
        commentsCount={commentsCount}
        publishedAt={post.publishedAt}
        canLike={canLike}
        canComment={canComment}
      />

      <span className="post__detail-card-separator" />

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
    </article>
  );
}

export default PostDetailCard;
