import { useGetMeQuery } from '@/services/api';
import { PostListItem } from '@/ts/interfaces';
import { buildPostDetailMeta } from '@/utils/postDetailCard';

import PostTitle from '@/components/PostTitle';
import PostContent from '@/components/PostContent';
import PostFooter from '@/components/PostFooter';

import PostDetailHeader from './PostDetailHeader';
import PostDetailComments from './PostDetailComments';

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
  const {
    body,
    canComment,
    canLike,
    comments,
    commentsCount,
    likesCount,
    destination,
    authorAlt,
    authorEmail,
    authorDisplayName,
    avatarSrc,
  } = buildPostDetailMeta({ post, me });

  return (
    <article className="post__detail-card">
      <PostDetailHeader
        destination={destination}
        avatarSrc={avatarSrc}
        authorAlt={authorAlt}
        authorDisplayName={authorDisplayName}
        authorEmail={authorEmail}
        onBack={onBack}
      />

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

      <PostDetailComments commentsCount={commentsCount} comments={comments} />
    </article>
  );
}

export default PostDetailCard;
