import Modal from 'react-modal';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FiSave } from 'react-icons/fi';

import { useCreatePostMutation } from '@/services/api';
import { createPostSchema } from '@/utils/validationSchemas';

import { CreateModalProps, CreatePostFormData } from '@/ts/interfaces';
import { ApiErrorResponse } from '@/ts/types/errors';

import { notify } from '@/components/Toaster/notify';
import Input from '@/components/Input';
import Button from '@/components/Button';
import TextArea from '@/components/TextArea';

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
      await createPost(info);

      reset();
      closeModal();

      notify.success('Post created successfully!');
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      notify.error(apiError.data?.message || 'Something went wrong. Please try again');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Create new post!"
      className="modal"
      overlayClassName="modal__background"
    >
      <div className="modal__header">
        <div className="modal__header-top">
          <img
            className="modal__header-top-photo"
            src={userProfilePhoto}
            alt="user profile"
          />
          <span className="modal__header-top-title">New Post</span>
        </div>

        <button
          className="modal__header-close"
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

          <TextArea
            inputName="body"
            register={register}
            className="modal__main-content-textarea"
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
              variant="submit"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateModal;
