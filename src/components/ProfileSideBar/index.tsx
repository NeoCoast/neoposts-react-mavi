import { FC, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import { ProfileSideBarProps } from '@/ts/interfaces';
import Button from '@/components/Button';
import LogOut from '@/components/LogOut';
import CreatePostModal from '@/components/CreatePostModal';
import { AppDispatch } from '@/services/store';
import { closeMobileMenu } from '@/utils/sideBarSlice';

import './styles.scss';

const ProfileSideBar: FC<ProfileSideBarProps> = ({
  className = '',
  name,
  email,
  posts,
  following,
  followers
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

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
            setIsOpen(true);
            dispatch(closeMobileMenu());
          }}
        />

        <CreatePostModal
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
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
