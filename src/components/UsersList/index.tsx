import { User } from '@/ts/interfaces';
import './styles.scss';
import { FC } from 'react';

const userProfilePhoto = new URL('@/assets/Icons/userProfilePhoto.svg', import.meta.url).href;

const UsersList: FC<{ users: User[] }> = ({ users }) => {
  return (
    <div className="users-list">
      {users.map((user) => (
        <div key={user.id} className="users-list__item">
          <div className="users-list__left">
            <img
              src={userProfilePhoto}
              alt={`${user.name}'s avatar`}
              className="users-list__avatar"
            />
            <div className="users-list__info">
              <span className="users-list__name">{user.name}</span>
              <span className="users-list__email">{user.email}</span>
            </div>
          </div>

          {typeof user.followed === 'boolean' && (
            <button
              className={`users-list__follow-button ${user.followed ? 'users-list__follow-button--active' : ''
                }`}
            >
              {user.followed ? 'Following' : 'Follow'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};


export default UsersList;
