import { useNavigate } from 'react-router-dom';

import { useGetMeQuery } from '@/services/api';
import { ROUTES } from '@/constants/routes';

import Navbar from '@/components/Navbar';
import MyProfileInfo from '@/components/ProfileInfo';

import './styles.scss';

const MyProfile = () => {
  const { data, isLoading, error } = useGetMeQuery();
  const navigate = useNavigate();

  if (!data) return null;

  return (
    <div className="my-profile">
      <Navbar />

      <MyProfileInfo
        name={`${data.name}`}
        email={data.email}
        postsCount={data.posts?.length ?? 0}
        followingCount={data.followees?.length ?? 0}
        followersCount={data.followers?.length ?? 0}
        onBack={() => navigate(ROUTES.HOME)}
      />
    </div>
  );
};


export default MyProfile;
