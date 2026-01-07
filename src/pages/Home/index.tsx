import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';


import Navbar from '@/components/Navbar';

import './styles.scss';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <Navbar />
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => navigate(ROUTES.LOGIN)}>Ir a Login</button>
        <button onClick={() => navigate(ROUTES.SIGNUP)}>Ir a Signup</button>
      </div>
    </div>
  );
};

export default Home;
