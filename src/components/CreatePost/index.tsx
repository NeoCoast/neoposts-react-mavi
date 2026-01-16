import { FC } from 'react';

import { CreatePostProps } from '@/ts/interfaces';

import Modal from '@/components/CreatePostModal';

import './styles.scss';

const CreatePost: FC<CreatePostProps> = (props) => {
  return <Modal {...props} />;
};

export default CreatePost;
