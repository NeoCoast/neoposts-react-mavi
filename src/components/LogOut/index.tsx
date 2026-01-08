import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ROUTES } from '@/constants/routes';
import { api, useLogOutMutation } from '@/services/api';
import { deleteUserInformation } from '@/utils/responseHeaderHandler';
import { notify } from '@/components/Toaster/notify';

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
      deleteUserInformation();
      navigate(ROUTES.LOGIN, { replace: true });
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="btn-logout"
      aria-label="Log out"
      disabled={isLoading}
      aria-busy={isLoading}
    >
      <MdLogout /> Sign Out
    </button>
  );
};

export default LogOut;
