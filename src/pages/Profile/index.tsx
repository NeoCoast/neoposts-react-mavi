import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';

import { useGetMeQuery } from '@/services/api';

import { ROUTES } from '@/constants/routes';

import ProfileInfo from '@/components/ProfileInfo';
import Button from '@/components/Button';

import './styles.scss';

const Profile = () => {
  const { data, isLoading, isFetching, error, refetch } = useGetMeQuery(undefined, {
    skip: !Boolean(localStorage.getItem('access-token')),
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get('tab');
    const allowedTabs = ['posts', 'following', 'followers'];

    if (!allowedTabs.includes(tab ?? '')) {
      navigate(`${ROUTES.MY_PROFILE}?tab=posts`, { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <div className="my-profile">
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
            onClick={refetch}
          >
            Retry
          </Button>
        </div>
      )}

      {!isLoading && !error && data && (
        <div className="my-profile__layout-profileInfo">
          <ProfileInfo
            name={`${data.name}`}
            email={data.email}
            posts={data.posts ?? []}
            following={data.followees ?? []}
            followers={data.followers ?? []}
            onBack={() => navigate(ROUTES.HOME)}
            followed={data.followed}
            isFetching={isFetching}
            onRetry={refetch}
            userId={data.id}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
