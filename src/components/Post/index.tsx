import type { PostProps } from '@/ts/interfaces';

import PostTitle from '@/components/PostTitle';
import PostContent from '@/components/PostContent';
import PostFooter from '@/components/PostFooter';

import './styles.scss';

const Post = ({ post, showContent = true }: PostProps) => {
  const { title, body, publishedAt } = post;

  return (
    <article className="post">
      <PostTitle title={title} />
      {showContent && <PostContent content={body} />}
      <PostFooter publishedAt={publishedAt} />
    </article>
  );
};

export default Post;
