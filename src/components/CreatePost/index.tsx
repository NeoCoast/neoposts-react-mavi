import { FC } from 'react';

import { CreatePostProps } from '@/ts/interfaces';

import Modal from '@/components/Modal';

import './styles.scss';

const CreatePost: FC<CreatePostProps> = ({ isOpen = false, closeModal = () => { } }) => {
  return (
    <div>
      <Modal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};

export default CreatePost;
