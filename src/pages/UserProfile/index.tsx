import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams, useLocation } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { useGetUserQuery } from '@/services/api';
import { ROUTES } from '@/constants/routes';

import Navbar from '@/components/Navbar';
import UserBar from '@/components/UserBar';
import ProfileInfo from '@/components/ProfileInfo';
import Button from '@/components/Button';

import './styles.scss';

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const backTarget = location.state && (location.state).from === 'post' ? ROUTES.HOME : ROUTES.USERS;

  const { data, error, isLoading, refetch } = useGetUserQuery(id ?? '');

  useEffect(() => {
    const tab = searchParams.get('tab');
    const allowedTabs = ['posts', 'following', 'followers'];
    if (!allowedTabs.includes(tab ?? '') && location.pathname === `${ROUTES.USERS}/${id}`) {
      navigate(`${ROUTES.USERS}/${id}?tab=posts`, { replace: true, state: location.state });
    }
  }, [searchParams, navigate, id, location.pathname]);

  let errorMessage = 'An error occurred while loading the user data.';

  if (error) {
    if ('status' in error) {
      const fetchError = error as FetchBaseQueryError;

      if (fetchError.status === 404) {
        errorMessage = 'User not found.';
      }
    } else {
      const serializedError = error as SerializedError;

      if (serializedError.message) {
        errorMessage = serializedError.message;
      }
    }
  }

  return (
    <div className="user-profile">
      <Navbar />

      <div className="user-profile__layout">
        <UserBar className="user-profile__layout-sidebar" />

        <div className="user-profile__layout-userInfo">
          {isLoading && (
            <div className="user-profile__layout-userInfo-loader">
              <Oval
                visible
                height="80"
                width="80"
                color="#0F31AA"
                secondaryColor="#1445D8"
                ariaLabel="oval-loading"
              />
            </div>
          )}

          {!isLoading && error && (
            <div className="user-profile__layout-userInfo-error">
              <p>{errorMessage}</p>
              <Button
                variant="primary"
                onClick={() => navigate(backTarget)}
              >
                Back to Users
              </Button>

            </div>
          )}

          {!isLoading && !error && data && (
            <ProfileInfo
              name={data.name}
              email={data.email}
              postsCount={data.posts?.length ?? 0}
              followingCount={data.followees?.length ?? 0}
              followersCount={data.followers?.length ?? 0}
              posts={data.posts ?? []}
              following={data.followees ?? []}
              followers={data.followers ?? []}
              followed={data.followed}
              isOwn={false}
              userId={data.id}
              onBack={() => navigate(backTarget)}
              onRetry={refetch}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
