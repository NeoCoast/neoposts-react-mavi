import type { AuthorDetailsProps } from '@/ts/interfaces';

import userProfilePlaceholder from '@/assets/Icons/userProfilePhoto.svg';

const AuthorDetails = ({ name, lastName, email, profilePhoto }: AuthorDetailsProps) => {
  const avatarSrc = userProfilePlaceholder;

  return (
    <div className="post__author">
      <img className="post__author-avatar" src={avatarSrc} alt={`${name} ${lastName}`} />
      <div className="post__author-info">
        <div className="post__author-name">{name} {lastName}</div>
        {email && <div className="post__author-email">{email}</div>}
      </div>
    </div>
  );
};

export default AuthorDetails;
