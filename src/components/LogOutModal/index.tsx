import Modal from 'react-modal';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

import { useLogOutMutation } from '@/services/api';
import { deleteUserInformation } from '@/utils/responseHeaderHandler';

import Button from '@/components/Button';

import './styles.scss';

Modal.setAppElement('#root');

interface LogOutModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const LogOutModal = ({ isOpen, closeModal }: LogOutModalProps) => {
  const [logOut, { isLoading }] = useLogOutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut({}).unwrap();

      deleteUserInformation();
      closeModal();
      navigate(ROUTES.LOGIN, { replace: true });
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong. Please try again');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Sign out"
      className="modal"
      overlayClassName="modal__background"
    >
      <button
        className="modal__close"
        onClick={closeModal}
        aria-label="Close modal"
      >
        &times;
      </button>

      <span className="modal__title">Log out</span>
      <span>Are you sure you want to log out?</span>

      <div className="modal__btn">
        <Button
          loading={isLoading}
          className='modal__btn-logOut'
          title="Log out"
          onClick={handleLogout}
          disabled={isLoading}
          variant="primary"
        />
        <Button
          loading={isLoading}
          className="modal__btn-cancel"
          title="Cancel"
          onClick={closeModal}
          variant="secondary"
        />
      </div>
    </Modal>
  );
};

export default LogOutModal;
