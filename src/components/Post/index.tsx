import type { PostProps } from '@/ts/interfaces';
import PostTitle from '@/components/PostTitle';
import PostContent from '@/components/PostContent';
import PostFooter from '@/components/PostFooter';

import './styles.scss';

const Post = ({ post }: PostProps) => {
  const { title, content, publishedAt } = post;

  return (
    <article className="post">
      <PostTitle title={title} />
      <PostContent content={content} />
      <PostFooter publishedAt={publishedAt} />
    </article>
  );
};

export default Post;
