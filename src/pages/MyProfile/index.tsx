import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';

import { useGetMeQuery } from '@/services/api';
import { ROUTES } from '@/constants/routes';

import Navbar from '@/components/Navbar';
import MyProfileInfo from '@/components/ProfileInfo';
import Button from '@/components/Button';

import './styles.scss';

const MyProfile = () => {
  const { data, isLoading, error, refetch } = useGetMeQuery();
  const navigate = useNavigate();

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
        <MyProfileInfo
          name={`${data.name}`}
          email={data.email}
          postsCount={data.posts?.length ?? 0}
          followingCount={data.followees?.length ?? 0}
          followersCount={data.followers?.length ?? 0}
          onBack={() => navigate(ROUTES.HOME)}
        />
      )}
    </div>
  );
};


export default MyProfile;
