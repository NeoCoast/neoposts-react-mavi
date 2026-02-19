import { FC, JSX, useState } from "react";
import { BsPersonCheck } from "react-icons/bs";
import { GoPersonAdd } from "react-icons/go";
import { Link } from "react-router-dom";

import { ROUTES } from "@/constants/routes";
import { useFollowUserMutation, useGetMeQuery, useUnfollowUserMutation } from "@/services/api";
import { UserData } from "@/ts/interfaces";

import { notify } from "@/components/Toaster/notify";
import Button from "@/components/Button";

import './styles.scss';

const userProfilePhoto = new URL('@/assets/Icons/userProfilePhoto.svg', import.meta.url).href;

const UserListItem = ({ user, areUsersLoading = false }: { user: UserData, areUsersLoading?: boolean }) => {
  const [buttonState, setButtonState] = useState<{
    color: 'primary' | 'secondary';
    text: JSX.Element;
  }>({
    color: user.followed ? 'secondary' : 'primary',
    text: user.followed ? <><BsPersonCheck /> Following</> : <><GoPersonAdd /> Follow</>
  });

  const [isLoadingFollowingMutation, setIsLoadingFollowingMutation] = useState(false);

  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  const { data: me } = useGetMeQuery();

  const redirectToProfile = (userId: string | number) => {
    if (me?.id === userId) {
      return ROUTES.MY_PROFILE;
    }

    return ROUTES.USER.replace(':id', String(userId));
  }

  const handleFollow = async () => {
    if (!user.id) return;

    setIsLoadingFollowingMutation(true);
    setButtonState({ color: 'secondary', text: <><BsPersonCheck /> Following</> });

    try {
      await followUser(user.id).unwrap();
    } catch (err) {
      notify.error('Unable to follow user.');
    } finally {
      setIsLoadingFollowingMutation(false);
    }
  };

  const handleUnfollow = async () => {
    if (!user.id) return;

    setButtonState({ color: 'primary', text: <><GoPersonAdd /> Follow</> });
    setIsLoadingFollowingMutation(true);

    try {
      await unfollowUser(user.id).unwrap();
    } catch (err) {
      notify.error('Unable to unfollow user.');
    } finally {
      setIsLoadingFollowingMutation(false);
    }
  };

  const handleButtonClick = () => {
    if (isLoadingFollowingMutation) return;

    if (buttonState.color === 'secondary') {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  const handleButtonColor = () => {
    if (isLoadingFollowingMutation || areUsersLoading) {
      return buttonState.color;
    }

    return user.followed ? 'secondary' : 'primary';
  }

  const handleButtonText = () => {
    if (isLoadingFollowingMutation || areUsersLoading) {
      return buttonState.text;
    }

    return user.followed ? <><BsPersonCheck /> Following</> : <><GoPersonAdd /> Follow</>;
  }

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

      {user.followed !== undefined && me?.id !== user.id && (
        <Button
          title={handleButtonText()}
          className="users_list-item-follow"
          variant={handleButtonColor()}
          onClick={handleButtonClick}
        />
      )}
    </div>
  );
};

export default UserListItem;
