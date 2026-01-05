import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import './styles.scss';

const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p>This is login route</p>
      <button onClick={() => navigate(ROUTES.HOME)}>Volver a Home</button>
    </div>
  );
};

export default Login;
