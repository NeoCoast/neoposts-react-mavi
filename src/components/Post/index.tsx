import type { PostProps } from '@/ts/interfaces';

import PostTitle from '@/components/PostTitle';
import PostContent from '@/components/PostContent';
import PostFooter from '@/components/PostFooter';

import './styles.scss';

const Post = ({ post, showContent = true , canLike = false}: PostProps) => {
  const { title, body, publishedAt } = post;

  return (
    <article className="post">
      <PostTitle title={title} />
      {showContent && <PostContent content={body} />}
      <PostFooter
        postId={post.id}
        liked={post.liked}
        publishedAt={publishedAt}
        likesCount={post.likesCount}
        commentsCount={post.commentsCount ?? 0}
        canLike={canLike}
      />
    </article>
  );
};

export default Post;
