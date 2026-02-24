import type { PostTitleProps } from '@/ts/interfaces';

import './styles.scss';

const PostTitle = ({ title, name }: PostTitleProps) => (
  <>
    <h1 className="post__title post__title-author">{name}</h1>
    <h3 className="post__title post__title-heading">{title}</h3>
  </>
);

export default PostTitle;
