import { JSX } from 'react';

import './styles.scss';

type EmptyStateProps = {
  title: string | JSX.Element;
  wrapperClass?: string;
  titleClass?: string;
};

const EmptyState = ({
  title,
}: EmptyStateProps) => (
  <div className='my-profile__card-posts-empty'>
    <p className='my-profile__card-posts-empty-title'>{title}</p>
  </div>
);

export default EmptyState;
