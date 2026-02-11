import { useGetMeQuery } from '@/services/api';
import './styles.scss';

const MyProfile = () => {

  const { data, isLoading, error } = useGetMeQuery();

  return (
    <div className="my-profile">
      <h1>My Profile</h1>
      <p>This is the My Profile page.</p>
    </div>
  );
}

export default MyProfile;
