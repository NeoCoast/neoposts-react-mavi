import type { PostProps } from '@/ts/interfaces';

import PostTitle from '@/components/PostTitle';
import PostContent from '@/components/PostContent';
import PostFooter from '@/components/PostFooter';

import './styles.scss';

const Post = ({ post, showContent = true, canLike = false }: PostProps) => {
  const { id, title, body, publishedAt, liked, likesCount, commentsCount } = post;

  return (
    <article className="post">
      <PostTitle title={title} />
      {showContent && <PostContent content={body} />}
      <PostFooter
        postId={id}
        liked={liked}
        publishedAt={publishedAt}
        likesCount={likesCount}
        commentsCount={commentsCount ?? 0}
        canLike={canLike}
      />
    </article>
  );
};

export default Post;
