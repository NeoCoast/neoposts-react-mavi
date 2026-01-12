import type { PostTitleProps } from '@/ts/interfaces';

import './styles.scss';

const PostTitle = ({ title, name, lastName }: PostTitleProps) => (
  <>
    <h1 className='post__title'>{[name, lastName].filter(Boolean).join(' ').trim()}</h1>
    <h3 className="post__title">{title}</h3>
  </>
);

export default PostTitle;
