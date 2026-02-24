import { ReactNode } from 'react';
import './styles.scss';

type EmptyStateProps = {
  children?: ReactNode;
};

const EmptyState = ({ children }: EmptyStateProps) => (
  <div className='my-profile__card-posts-empty'>
    <p className='my-profile__card-posts-empty-title'>{children}</p>
  </div>
);

export default EmptyState;
