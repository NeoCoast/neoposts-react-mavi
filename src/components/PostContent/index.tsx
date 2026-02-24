import type { PostContentProps } from '@/ts/interfaces';

import './styles.scss';

const PostContent = ({ content }: PostContentProps) => (
  <div className="post__content">{content}</div>
);

export default PostContent;
