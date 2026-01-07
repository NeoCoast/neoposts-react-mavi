import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from '@/components/Navbar';
import ProfileSideBar from '@/components/ProfileSideBar';

import './styles.scss';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <Navbar />
      <Toaster position="top-center" />
      <div className="layout__sidebar">
        <ProfileSideBar
          name="Victoria Rivao  "
          email="victoria.rivao@neocoast.com"
          posts={34}
          following={128}
          followers={256}
        />
      </div>
    </div>
  );
};

export default Home;
