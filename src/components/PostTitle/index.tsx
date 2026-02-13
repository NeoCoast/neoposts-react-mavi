import type { PostTitleProps } from '@/ts/interfaces';

import './styles.scss';

const PostTitle = ({ title, name }: PostTitleProps) => {
  const authorName = [name].filter(Boolean).join(' ').trim();

  return (
    <>
      {authorName && <h1 className="post__title post__title-author">{authorName}</h1>}
      <h3 className="post__title post__title-heading">{title}</h3>
    </>
  );
};

export default PostTitle;
