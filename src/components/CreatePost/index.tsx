import { FC, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

import Modal from '@/components/Modal';
import Button from '@/components/Button';

import './styles.scss';

export interface CreatePostProps {
  isOpen?: boolean;
  closeModal?: () => void;
};

const CreatePost: FC<CreatePostProps> = ({ isOpen: controlledIsOpen, closeModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const internalOpen = () => setIsModalOpen(true);
  const internalClose = () => setIsModalOpen(false);

  const isOpen = controlledIsOpen ?? isModalOpen;
  const handleClose = () => (closeModal ? closeModal() : internalClose());

  return (
    <div>
      {controlledIsOpen === undefined && (
        <Button className="create-post" onClick={internalOpen} variant={''} title={'New Post'} />
      )}
      <FaPlus />
      <div>
        <Modal isOpen={isOpen} closeModal={handleClose} />
      </div>
    </div>
  );
};

export default CreatePost;
