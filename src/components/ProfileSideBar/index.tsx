import { FC } from 'react';
import { LuLogOut } from 'react-icons/lu';
import Button from '@/components/Button';
import { FaPlus } from "react-icons/fa";

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
  return (
    <aside className="profile__sidebar" aria-label="Profile sidebar">
      <div className="profile__sidebar-card">
        <div className="profile__sidebar-card-avatar" aria-hidden="true" />

        <div className="profile__sidebar-card-info">
          <h3 className="profile__sidebar-card-info-name">{name}</h3>
          <p className="profile__sidebar-email" title={email}>{email}</p>
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
          <div className="profile__sidebar-card-stats-stat">
            <span className="profile__sidebar-card-stats-stat-span">Posts</span>
            <span className="profile__sidebar-card-stats-stat-value">{posts}</span>
          </div>
          <div className="profile__sidebar-card-stats">
            <span className="profile__sidebar-card-stats-stat-span">Following</span>
            <span className="profile__sidebar-card-stats-stat-value">{following}</span>
          </div>
          <div className="profile__sidebar-card-stats">
            <span className="profile__sidebar-card-stats-stat-span">Followers</span>
            <span className="profile__sidebar-card-stats-stat-value">{followers}</span>
          </div>
        </div>

        <button className="profile__sidebar-card-logout">
          <LuLogOut className="profile__sidebar-card-logout-icon" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default ProfileSideBar;
