import { FC } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { ProfileSideBarProps } from '@/ts/interfaces';
import Button from '@/components/Button';
import LogOut from '@/components/LogOut';
import CreatePostModal from '@/components/CreatePostModal';
import { AppDispatch, RootState } from '@/services/store';
import { openCreatePostModal, closeCreatePostModal } from '@/utils/sideBarSlice';

import './styles.scss';

const ProfileSideBar: FC<ProfileSideBarProps> = ({
  className = '',
  name,
  email,
  posts,
  following,
  followers
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootState) => state.ui.createPostModalOpen);

  const stats = [
    { title: 'Posts', value: posts },
    { title: 'Following', value: following },
    { title: 'Followers', value: followers },
  ];

  return (
    <aside className={cn("profile__sidebar", className)} aria-label="Profile sidebar">
      <div className="profile__sidebar-card">
        <div className="profile__sidebar-card-avatar" aria-hidden="true" />

        <div className="profile__sidebar-card-info">
          <h3 className="profile__sidebar-card-info-name">{name}</h3>
          <p className="profile__sidebar-card-info-email">{email}</p>
        </div>

        <Button
          className="profile__sidebar-card-newPost"
          title={
            <span className="profile__sidebar-card-newPost-content">
              <FaPlus className="profile__sidebar-card-newPost-content-icon" />
              <span>New Post</span>
            </span>
          }
          onClick={() => {
            dispatch(openCreatePostModal());
          }}
        />

        <CreatePostModal
          isOpen={isOpen}
          closeModal={() => dispatch(closeCreatePostModal())}
        />
        <div className="profile__sidebar-card-stats">
          {stats.map(({ title, value }) => (
            <div className="profile__sidebar-card-stats-stat" key={title}>
              <span className="profile__sidebar-card-stats-stat-span">{title}</span>
              <span className="profile__sidebar-card-stats-stat-value">{value}</span>
            </div>
          ))}
        </div>

        <div className="profile__sidebar-card-logout">
          <LogOut />
        </div>
      </div>
    </aside>
  );
};

export default ProfileSideBar;
