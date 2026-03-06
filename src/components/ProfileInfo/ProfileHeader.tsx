import { IoIosArrowBack } from 'react-icons/io';
import { BsPersonCheck } from 'react-icons/bs';
import { GoPersonAdd } from 'react-icons/go';

import userProfilePlaceholder from '@/assets/Icons/userProfilePhoto.svg';
import Button from '@/components/Button';

type ProfileHeaderProps = {
  name: string;
  email: string;
  isOwn: boolean;
  isFollowed: boolean | undefined;
  onBack: VoidFunction;
  onFollowToggle: VoidFunction;
};

const ProfileHeader = ({
  name,
  email,
  isOwn,
  isFollowed,
  onBack,
  onFollowToggle,
}: ProfileHeaderProps) => {
  return (
    <>
      <Button
        variant="icon"
        className="my-profile__card-back"
        aria-label="Back"
        onClick={onBack}
      >
        <IoIosArrowBack />
        Back
      </Button>

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

        {!isOwn && (
          <div className="my-profile__card-header-action">
            <Button
              variant={isFollowed ? 'secondary' : 'primary'}
              onClick={onFollowToggle}
            >
              {isFollowed ? (
                <>
                  <BsPersonCheck /> Following
                </>
              ) : (
                <>
                  <GoPersonAdd /> Follow
                </>
              )}
            </Button>
          </div>
        )}
      </header>

      <div className="my-profile__card-separator" />
    </>
  );
};

export default ProfileHeader;
