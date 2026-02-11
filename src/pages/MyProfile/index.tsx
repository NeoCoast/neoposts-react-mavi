import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { FaPlus } from 'react-icons/fa';

import { useGetMeQuery, useLogOutMutation, api } from '@/services/api';
import { AppDispatch } from '@/services/store';

import { ROUTES } from '@/constants/routes';
import { openCreatePostModal } from '@/utils/uiSlice';

import Navbar from '@/components/Navbar';
import MyProfileInfo from '@/components/ProfileInfo';
import Button from '@/components/Button';
import LogOut from '@/components/LogOut';

import './styles.scss';

const MyProfile = () => {
  const { data, isLoading, error, refetch } = useGetMeQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="my-profile">
      <Navbar />

      {isLoading && (
        <div className="my-profile__loader">
          <Oval
            visible
            height="60"
            width="60"
            color="#0F31AA"
            secondaryColor="#1445D8"
          />
        </div>
      )}

      {!isLoading && error && (
        <div className="my-profile__error">
          <p>Unable to load profile. Please try again.</p>
          <Button
            variant="primary"
            title="Retry"
            onClick={() => refetch()}
          />
        </div>
      )}

      {!isLoading && !error && data && (
        <div className="my-profile__content">
          <div className="my-profile__content-buttons">
            <Button
              className="my-profile__content-buttons-newPost"
              title={
                <span className="my-profile__content-buttons-newPost-content">
                  <FaPlus className="my-profile__content-buttons-newPost-content-icon" />
                  <span>New Post</span>
                </span>
              }
              onClick={() => {
                dispatch(openCreatePostModal());
              }}
            />
            <LogOut />
          </div>
          <MyProfileInfo
            name={`${data.name}`}
            email={data.email}
            postsCount={data.posts?.length ?? 0}
            followingCount={data.followees?.length ?? 0}
            followersCount={data.followers?.length ?? 0}
            onBack={() => navigate(ROUTES.HOME)}
          />
        </div>
      )}
    </div>
  );
};


export default MyProfile;
