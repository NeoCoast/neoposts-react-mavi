import type { AuthorDetailsProps } from '@/ts/interfaces';

import userProfilePlaceholder from '@/assets/Icons/userProfilePhoto.svg';

import './author.scss';

const AuthorDetails = ({ name, email, profilePhoto, className }: AuthorDetailsProps) => {
  const rootClass = `post-author ${className ?? ''}`;
  return (
    <div className={rootClass}>
      <img
        className="post-author__avatar"
        src={profilePhoto || userProfilePlaceholder}
        alt={name}
      />
      <div className="post-author__info">
        <div className="post-author__name">{name}</div>
        {email && <div className="post-author__email">{email}</div>}
      </div>
    </div>
  );
};

export default AuthorDetails;
