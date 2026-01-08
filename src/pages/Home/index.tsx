import Navbar from '@/components/Navbar';
import UserBar from '@/components/UserBar';
import Toaster from '@/components/Toaster';

import './styles.scss';

const Home = () => {

  return (
    <div className="home">
      <Navbar />
      <Toaster position="top-center" />
      <div className="layout__sidebar">
        <UserBar />
      </div>
    </div>
  );
};

export default Home;
