import { FC } from 'react';
import { GoPersonAdd } from 'react-icons/go';
import { BsPersonCheck } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

import Button from '@/components/Button';
import { useGetMeQuery } from '@/services/api';
import { UserData } from '@/ts/interfaces';

import './styles.scss';

const userProfilePhoto = new URL('@/assets/Icons/userProfilePhoto.svg', import.meta.url).href;

const UsersList: FC<{ users: UserData[] }> = ({ users }) => {
  const { data: me } = useGetMeQuery();

  const redirectToProfile = (userId: string | number) => {
    if (me?.id === userId) {
      return ROUTES.MY_PROFILE;
    }
    return ROUTES.USER.replace(':id', String(userId));
  }

  return (
    <div className="users_list">
      {users.map(({ id, name, email, followed }) => (
        <div key={id} className="users_list-item">
          <div className="users_list-item-left">
            <Link to={redirectToProfile(id)} className="users_list-item-left-link">
              <img
                src={userProfilePhoto}
                alt={`${name}'s avatar`}
                className="users_list-item-left-link-avatar"
              />
            </Link>

            <div className="users_list-item-left-info">
              <Link to={redirectToProfile(id)} className="users_list-item-left-info-link">
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
