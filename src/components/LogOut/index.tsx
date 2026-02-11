import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ROUTES } from '@/constants/routes';
import { api, useLogOutMutation } from '@/services/api';
import { clearAuthTokens } from '@/utils/responseHeaderHandler';
import { notify } from '@/components/Toaster/notify';
import Button from '@/components/Button';

import './styles.scss';

const LogOut = () => {
  const [logOut, { isLoading }] = useLogOutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut().unwrap();
    } catch (err: any) {
      if (err?.status !== 404) {
        notify.error('Error logging out. Please try again.');
      }
    } finally {
      dispatch(api.util.resetApiState());
      clearAuthTokens();
      navigate(ROUTES.LOGIN, { replace: true });
    }
  };

  return (
    <Button
      variant="secondary"
      onClick={handleLogout}
      loading={isLoading}
      disabled={isLoading}
      title={
        <>
          <MdLogout />
          <span>Sign Out</span>
        </>
      }
      className="btn-logout"
    />
  );
};

export default LogOut;
