import Modal from 'react-modal';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FiSave } from 'react-icons/fi';

import { useCreatePostMutation } from '@/services/api';
import { createPostSchema } from '@/utils/validationSchemas';
import { CreateModalProps, CreatePostFormData } from '@/ts/interfaces';

import { notify } from '@/components/Toaster/notify';

import Input from '@/components/Input';
import Button from '@/components/Button';
import Text from '@/components/Text';

import './styles.scss';

Modal.setAppElement('#root');

const userProfilePhoto = new URL('@/assets/Icons/userProfilePhoto.svg', import.meta.url).href;

const CreateModal = ({ isOpen, closeModal }: CreateModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<CreatePostFormData>({
    mode: 'onChange',
    resolver: zodResolver(createPostSchema),
  });

  const [createPost, { isLoading }] = useCreatePostMutation();

  const onSubmit = async (info: CreatePostFormData) => {
    try {
      await createPost(info).unwrap();

      reset();
      closeModal();

      notify.success('Post created successfully!');
    } catch (err: any) {
      notify.error(err?.data?.errors || 'Something went wrong. Please try again');
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Create new post!"
        className="modal"
        overlayClassName="modal__background"
      >
        <div className="modal__header">
          <div className="modal__header-left">
            <img
              className="modal__main-photo"
              src={userProfilePhoto}
              alt="user profile"
            />
            <span className="modal__title">New Post</span>
          </div>

          <button
            className="modal__close"
            onClick={() => {
              reset();
              closeModal();
            }}
          >
            &times;
          </button>
        </div>

        <div className="modal__main">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="modal__main-content"
          >
            <Input
              inputName="title"
              register={register}
              required
              className="modal__main-content-input"
              placeholder="Title"
            />

            <Text
              inputName="body"
              register={register}
              required
              placeholder="Share something with your team!"
            />

            <div className="modal__main-content-post">
              <FiSave className="modal__icon" />

              <Button
                type="submit"
                title="Post"
                loading={isLoading}
                disabled={!isValid}
                className="modal__main-content-post-btn"
                variant=""
              />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CreateModal;
