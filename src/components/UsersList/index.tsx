import { FC } from 'react';
import cn from 'classnames';
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
      {users.map(({ id, name, email, followed }) => (
        <div key={id} className="users_list-item">
          <div className="users_list-left">
            <img
              src={userProfilePhoto}
              alt={`${name}'s avatar`}
              className="users_list-avatar"
            />
            <div className="users_list-info">
              <span className="users_list-name">{name}</span>
              <span className="users_list-email">{email}</span>
            </div>
          </div>

          {followed !== undefined && me?.id !== id && (
            <Button
              title={
                followed ? (<><BsPersonCheck /> Following</>)
                  : (<><GoPersonAdd /> Follow</>)}
              className={cn('users_list-follow-button', { 'users_list-follow-button--active': followed })}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default UsersList;
