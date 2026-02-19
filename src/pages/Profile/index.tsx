import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { FaPlus } from 'react-icons/fa';

import { useGetMeQuery } from '@/services/api';
import { AppDispatch } from '@/services/store';

import { ROUTES } from '@/constants/routes';
import { openCreatePostModal } from '@/utils/uiSlice';

import Navbar from '@/components/Navbar';
import ProfileInfo from '@/components/ProfileInfo';
import Button from '@/components/Button';
import LogOut from '@/components/LogOut';

import './styles.scss';

const Profile = () => {
  const { data, isLoading, isFetching, error, refetch } = useGetMeQuery();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const tab = searchParams.get('tab');
    const allowedTabs = ['posts', 'following', 'followers'];

    if (!allowedTabs.includes(tab ?? '')) {
      navigate(`${ROUTES.MY_PROFILE}?tab=posts`, { replace: true });
    }
  }, [searchParams, navigate]);

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
                  New Post
                </span>
              }
              onClick={() => {
                dispatch(openCreatePostModal());
              }}
            />
            <LogOut />
          </div>
          <ProfileInfo
            name={`${data.name}`}
            email={data.email}
            postsCount={data.posts?.length ?? 0}
            followingCount={data.followees?.length ?? 0}
            followersCount={data.followers?.length ?? 0}
            posts={data.posts ?? []}
            following={data.followees ?? []}
            followers={data.followers ?? []}
            onBack={() => navigate(ROUTES.HOME)}
            followed={data.followed}
            isFetching={isFetching}
            onRetry={refetch}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
