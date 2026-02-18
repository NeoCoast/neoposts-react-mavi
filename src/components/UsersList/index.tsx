import { FC, useState } from 'react';
import { GoPersonAdd } from 'react-icons/go';
import { BsPersonCheck } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { useGetMeQuery, useFollowUserMutation, useUnfollowUserMutation, api } from '@/services/api';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/services/store';
import { ROUTES } from '@/constants/routes';
import { UserData } from '@/ts/interfaces';

import Button from '@/components/Button';
import { notify } from '@/components/Toaster/notify';

import './styles.scss';

const userProfilePhoto = new URL('@/assets/Icons/userProfilePhoto.svg', import.meta.url).href;

const UsersList: FC<{ users: UserData[] }> = ({ users }) => {
  const { data: me } = useGetMeQuery();
  const dispatch = useDispatch<AppDispatch>();
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  const redirectToProfile = (userId: string | number) => {
    if (me?.id === userId) {
      return ROUTES.MY_PROFILE;
    }
    return ROUTES.USER.replace(':id', String(userId));
  }

  const UserListItem: FC<{ user: UserData }> = ({ user }) => {
    const [isFollowed, setIsFollowed] = useState<boolean | undefined>(user.followed);
    const [isLoading, setIsLoading] = useState(false);

    const handleFollow = async () => {
      if (!user.id) return;
      setIsLoading(true);
      try {
        await followUser(user.id).unwrap();
        setIsFollowed(true);
        dispatch(api.util.invalidateTags(['User']));
      } catch (e) {
        notify.error('Unable to follow user. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    const handleUnfollow = async () => {
      if (!user.id) return;
      setIsLoading(true);
      try {
        await unfollowUser(user.id).unwrap();
        setIsFollowed(false);
        dispatch(api.util.invalidateTags(['User']));
      } catch (e) {
        notify.error('Unable to unfollow user. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div key={user.id} className="users_list-item">
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

        {isFollowed !== undefined && me?.id !== user.id && (
          <Button
            title={isFollowed ? (<><BsPersonCheck /> Following</>) : (<><GoPersonAdd /> Follow</>)}
            className="users_list-item-follow"
            variant={isFollowed ? 'secondary' : 'primary'}
            onClick={isFollowed ? handleUnfollow : handleFollow}
            disabled={isLoading}
          />
        )}
      </div>
    );
  };

  return (
    <div className="users_list">
      {users.map((u) => (
        <UserListItem key={u.id} user={u} />
      ))}
    </div>
  );
};

export default UsersList;
