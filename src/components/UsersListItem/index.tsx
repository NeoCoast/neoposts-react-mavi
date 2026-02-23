import { useState } from 'react';
import { BsPersonCheck } from 'react-icons/bs';
import { GoPersonAdd } from 'react-icons/go';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { useFollowUserMutation, useUnfollowUserMutation } from '@/services/api';
import { UserData } from '@/ts/interfaces';

import { notify } from '@/components/Toaster/notify';
import Button from '@/components/Button';

import './styles.scss';

const userProfilePhoto = new URL('@/assets/Icons/userProfilePhoto.svg', import.meta.url).href;

const UserListItem = ({
  user,
  onUnfollow,
  onFollow,
  meId,
}: {
  user: UserData;
  onUnfollow?: (userId: string | number) => void;
  onFollow?: (userId: string | number) => void;
  meId?: string | number;
}) => {
  const [isLoadingFollowingMutation, setIsLoadingFollowingMutation] = useState(false);

  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  const redirectToProfile = (userId: string | number) => {
    if (meId === userId) {
      return ROUTES.MY_PROFILE;
    }

    return ROUTES.USER.replace(':id', String(userId));
  }

  const handleFollow = async () => {
    if (!user.id) return;

    setIsLoadingFollowingMutation(true);

    try {
      await followUser(user.id).unwrap();

      onFollow?.(user.id);
    } catch (err) {
      notify.error('Unable to follow user.');
    } finally {
      setIsLoadingFollowingMutation(false);
    }
  };

  const handleUnfollow = async () => {
    if (!user.id) return;

    setIsLoadingFollowingMutation(true);

    try {
      await unfollowUser(user.id).unwrap();

      onUnfollow?.(user.id);
    } catch (err) {
      notify.error('Unable to unfollow user.');
    } finally {
      setIsLoadingFollowingMutation(false);
    }
  };

  const handleButtonClick = () => {
    if (isLoadingFollowingMutation) return;

    if (user.followed) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <div className="users_list-item">
      <div className="users_list-item-left">
        <Link to={redirectToProfile(user.id)} className="users_list-item-left-link">
          <img
            src={userProfilePhoto}
            alt={`${user.name}'s avatar`}
            className="users_list-item-left-link-avatar"
          />
        </Link>

        <div className="users_list-item-left-info">
          <Link to={redirectToProfile(user.id)} className="users_list-item-left-info-link">
            <div className="users_list-item-left-info-link-name">{user.name}</div>
            <div className="users_list-item-left-info-link-email">{user.email}</div>
          </Link>
        </div>
      </div>

      {meId !== user.id && (
        <Button
          className="users_list-item-follow"
          variant={user.followed ? 'secondary' : 'primary'}
          onClick={handleButtonClick}
        >
          {user.followed ? <><BsPersonCheck /> Following</> : <><GoPersonAdd /> Follow</>}
        </Button>
      )}
    </div>
  );
};

export default UserListItem;
