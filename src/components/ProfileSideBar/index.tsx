import { FC } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import Button from '@/components/Button';
import LogOut from '@/components/LogOut';
import CreatePostModal from '@/components/CreatePostModal';

import { ProfileSideBarProps } from '@/ts/interfaces';
import { AppDispatch, RootState } from '@/services/store';
import { openCreatePostModal, closeCreatePostModal } from '@/utils/uiSlice';
import { ROUTES } from '@/constants/routes';

import './styles.scss';

const ProfileSideBar: FC<ProfileSideBarProps> = ({
  className = '',
  actionsOnly = false,
  name,
  email,
  posts,
  followees,
  followers
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootState) => state.ui.createPostModalOpen);

  const stats = [
    { title: 'Posts', value: posts, tab: 'posts' },
    { title: 'Following', value: followees, tab: 'following' },
    { title: 'Followers', value: followers, tab: 'followers' },
  ];

  return (
    <aside
      className={cn("profile__sidebar", className, { 'profile__sidebar--actions-only': actionsOnly })}
      aria-label="Profile sidebar"
    >
      <div className={cn("profile__sidebar-card", { 'profile__sidebar-card--actions-only': actionsOnly })}>
        {!actionsOnly && (
          <>
            <Link to={ROUTES.MY_PROFILE} aria-label="Go to my profile" className="profile__sidebar-link">
              <div className="profile__sidebar-card-avatar" aria-hidden="true" />
            </Link>

            <Link to={ROUTES.MY_PROFILE} aria-label="Go to my profile" className="profile__sidebar-link">
              <div className="profile__sidebar-card-info">
                <h3 className="profile__sidebar-card-info-name">{name}</h3>
                <p className="profile__sidebar-card-info-email">{email}</p>
              </div>
            </Link>
          </>
        )}

        <Button
          variant="primary"
          className="profile__sidebar-card-newPost"
          onClick={() => {
            dispatch(openCreatePostModal());
          }}
        >
          <FaPlus className="profile__sidebar-card-newPost-content-icon" />
          New Post
        </Button>

        <CreatePostModal
          isOpen={isOpen}
          closeModal={() => dispatch(closeCreatePostModal())}
        />
        {!actionsOnly && (
          <div className="profile__sidebar-card-stats">
            {stats.map(({ title, value, tab }) => (
              <Link
                to={{ pathname: ROUTES.MY_PROFILE, search: `?tab=${tab}` }}
                key={title}
                className="profile__sidebar-card-stats-stat profile__sidebar-card-stats-link"
              >
                <span className="profile__sidebar-card-stats-stat-span">{title}</span>
                <span className="profile__sidebar-card-stats-stat-value">{value}</span>
              </Link>
            ))}
          </div>
        )}

        <div className={cn("profile__sidebar-card-logout", { 'profile__sidebar-card-logout--actions-only': actionsOnly })}>
          <LogOut />
        </div>
      </div>
    </aside>
  );
};

export default ProfileSideBar;
