import type { PostProps } from '@/ts/interfaces';

import PostTitle from '@/components/PostTitle';
import PostContent from '@/components/PostContent';
import PostFooter from '@/components/PostFooter';

import './styles.scss';

const Post = ({ post, showContent = true }: PostProps) => {
  const title = post.title;
  const content = post.body;
  const publishedAt = post.publishedAt;

  return (
    <article className="post">
      <PostTitle title={title} />
      {showContent && <PostContent content={content} />}
      <PostFooter publishedAt={publishedAt} />
    </article>
  );
};

export default Post;
