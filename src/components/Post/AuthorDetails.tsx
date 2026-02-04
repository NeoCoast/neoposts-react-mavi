import type { AuthorDetailsProps } from '@/ts/interfaces';

import userProfilePlaceholder from '@/assets/Icons/userProfilePhoto.svg';

import './author.scss';

const AuthorDetails = ({ name, lastName, email, profilePhoto }: AuthorDetailsProps) => {

  return (
    <div className="post-author">
      <img className="post-author__avatar" src={userProfilePlaceholder} alt={`${name} ${lastName}`} />
      <div className="post-author__info">
        <div className="post-author__name">{name} {lastName}</div>
        {email && <div className="post-author__email">{email}</div>}
      </div>
    </div>
  );
};

export default AuthorDetails;
