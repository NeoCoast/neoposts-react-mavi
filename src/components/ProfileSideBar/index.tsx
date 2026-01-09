import { FC } from 'react';
import { FaPlus } from "react-icons/fa";
import Button from '@/components/Button';
import LogOut from '@/components/LogOut';

import './styles.scss';

export type ProfileSideBarProps = {
  name: string;
  email: string;
  posts: number;
  following: number;
  followers: number;
};

const ProfileSideBar: FC<ProfileSideBarProps> = ({
  name,
  email,
  posts,
  following,
  followers
}) => {
  const stats = [
    { title: 'Posts', value: posts },
    { title: 'Following', value: following },
    { title: 'Followers', value: followers },
  ];

  return (
    <aside className="profile__sidebar" aria-label="Profile sidebar">
      <div className="profile__sidebar-card">
        <div className="profile__sidebar-card-avatar" aria-hidden="true" />

        <div className="profile__sidebar-card-info">
          <h3 className="profile__sidebar-card-info-name">{name}</h3>
          <p className="profile__sidebar-card-info-email">{email}</p>
        </div>

        <Button
          variant="profile__sidebar-card-newPost"
          title={
            <span className="profile__sidebar-card-newPost-content">
              <FaPlus className='profile__sidebar-card-newPost-content-icon' />
              <span>New Post</span>
            </span>
          }
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
