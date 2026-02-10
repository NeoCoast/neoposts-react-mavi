import { useMemo } from 'react';
import Modal from 'react-modal';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import cn from 'classnames';

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
    watch,
    formState: { isValid, errors },
  } = useForm<CreatePostFormData>({
    mode: 'onChange',
    resolver: zodResolver(createPostSchema),
  });

  const [createPost, { isLoading }] = useCreatePostMutation();

  const titleValue = watch('title') || '';

  const { titleLength, isTitleTooLong } = useMemo(() => ({
    titleLength: titleValue.length,
    isTitleTooLong: titleValue.length > 100,
  }), [titleValue]);

  const onSubmit = async (info: CreatePostFormData) => {
    try {
      await createPost(info).unwrap();

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
        <Button
          type="button"
          variant="icon"
          className="modal__header-close"
          onClick={() => {
            reset();
            closeModal();
          }}
          title="X"
        />
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
            errors={isTitleTooLong ? { message: 'Title cannot exceed 100 characters' } : errors?.title}
            className="modal__main-content-input"
            placeholder="Title"
          />

          <div
            className={cn('modal__main-content-title-counter', {
              'modal__main-content-title-counter--error': isTitleTooLong,
            })}
          >
            {titleLength}/100
          </div>

          <TextArea
            inputName="body"
            register={register}
            className="modal__main-content-textarea"
            required
            placeholder="Share something with your team!"
          />

          <div className="modal__main-content-post">

            <Button
              type="submit"
              title="Post"
              loading={isLoading}
              disabled={!isValid || isTitleTooLong}
              className="modal__main-content-post-btn"
              variant="primary"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateModal;
