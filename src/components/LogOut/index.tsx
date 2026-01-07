import { useState } from 'react';
import { MdLogout } from 'react-icons/md';

import SignoutModal from '@/components/LogOutModal';

import './styles.scss';

const LogOut = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button onClick={openModal} className="btn-logout" aria-label="Log out">
        <MdLogout /> Sign Out
      </button>
      <SignoutModal isOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};

export default LogOut;
