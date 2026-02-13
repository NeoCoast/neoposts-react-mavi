import { FC } from 'react';
import { GoPersonAdd } from 'react-icons/go';
import { BsPersonCheck } from 'react-icons/bs';
import { Link } from 'react-router-dom';

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
          <div className="users_list-item-left">
            <Link to={`/users/${id}`} className="users_list-item-left-link">
              <img
                src={userProfilePhoto}
                alt={`${name}'s avatar`}
                className="users_list-item-left-link-avatar"
              />
            </Link>

            <div className="users_list-item-left-info">
              <Link to={`/users/${id}`} className="users_list-item-left-info-link">
                <div className="users_list-item-left-info-link-name">{name}</div>
                <div className="users_list-item-left-info-link-email">{email}</div>
              </Link>
            </div>
          </div>

          {followed !== undefined && me?.id !== id && (
            <Button
              title={
                followed ? (<><BsPersonCheck /> Following</>)
                  : (<><GoPersonAdd /> Follow</>)}
              className="users_list-item-follow"
              variant={followed ? 'secondary' : 'primary'}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default UsersList;
