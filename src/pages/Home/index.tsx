import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => navigate(ROUTES.LOGIN)}>Ir a Login</button>
        <button onClick={() => navigate(ROUTES.SIGNUP)}>Ir a Signup</button>
      </div>
    </div>
  );
};

export default Home;
