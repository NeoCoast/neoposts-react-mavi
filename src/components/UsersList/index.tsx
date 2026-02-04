import { FC } from 'react';
import { GoPersonAdd } from 'react-icons/go';
import { BsPersonCheck } from 'react-icons/bs';

import Button from '@/components/Button';
import { useGetMeQuery } from '@/services/api';
import { User } from '@/ts/interfaces';

import './styles.scss';

const userProfilePhoto = new URL('@/assets/Icons/userProfilePhoto.svg', import.meta.url).href;

const UsersList: FC<{ users: User[] }> = ({ users }) => {
  const { data: me } = useGetMeQuery();

  return (
    <div className="users_list">
      {users.map((user) => (
        <div key={user.id} className="users_list-item">
          <div className="users_list-left">
            <img
              src={userProfilePhoto}
              alt={`${user.name}'s avatar`}
              className="users_list-avatar"
            />
            <div className="users_list-info">
              <span className="users_list-name">{user.name}</span>
              <span className="users_list-email">{user.email}</span>
            </div>
          </div>

          {typeof user.followed === 'boolean' && me?.id !== user.id && (
            <Button
              title={
                user.followed ? (<><BsPersonCheck /> Following</>)
                  : (<><GoPersonAdd /> Follow</>)}
              className={`users_list-follow-button ${user.followed ? 'users_list-follow-button--active' : ''}`}
            />
          )}

        </div>
      ))}
    </div>
  );
};


export default UsersList;
