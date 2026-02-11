import { IoIosArrowBack } from 'react-icons/io';

import Button from '@/components/Button';
import userProfilePlaceholder from '@/assets/Icons/userProfilePhoto.svg';

import './styles.scss';

type MyProfileInfoProps = {
  name: string;
  email: string;
  postsCount: number;
  followingCount: number;
  followersCount: number;
  onBack: () => void;
};

const ProfileInfo = ({
  name,
  email,
  postsCount,
  followingCount,
  followersCount,
  onBack,
}: MyProfileInfoProps) => {
  return (
    <article className="my-profile__card">

      <Button
        variant="icon"
        className="my-profile__card-back"
        aria-label="Back"
        onClick={onBack}
        title={
          <>
            <IoIosArrowBack />
            <span>Back</span>
          </>
        }
      />

      <header className="my-profile__card-header">
        <img
          className="my-profile__card-header-avatar"
          src={userProfilePlaceholder}
          alt={name}
        />

        <div className="my-profile__card-header-info">
          <p className="my-profile__card-header-info-name">{name}</p>
          <p className="my-profile__card-header-info-email">{email}</p>
        </div>
      </header>

      <div className="my-profile__card-separator" />

      <section className="my-profile__card-stats">
        <div className="my-profile__card-stats-item active">
          <span className="value">{postsCount}</span>
          <span className="label">Post</span>
        </div>

        <div className="my-profile__card-stats-item">
          <span className="value">{followingCount}</span>
          <span className="label">Following</span>
        </div>

        <div className="my-profile__card-stats-item">
          <span className="value">{followersCount}</span>
          <span className="label">Followers</span>
        </div>
      </section>

      <div className="my-profile__card-separator" />

      <section className="my-profile__card-posts">
      </section>

    </article>
  );
};

export default ProfileInfo;
