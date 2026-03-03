import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import cn from 'classnames';

import { CreateModalProps, CreatePostFormData } from '@/ts/interfaces';
import { ApiErrorResponse } from '@/ts/types/errors';
import { useCreatePostMutation } from '@/services/api';
import { createPostSchema } from '@/utils/validationSchemas';

import BaseModal from '@/components/BaseModal';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import { notify } from '@/components/Toaster/notify';

const userProfilePhoto = new URL('@/assets/Icons/userProfilePhoto.svg', import.meta.url).href;

import './styles.scss';

const CreatePostModal = ({ isOpen, closeModal }: CreateModalProps) => {
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
  const { titleLength, isTitleTooLong } = useMemo(
    () => ({
      titleLength: titleValue.length,
      isTitleTooLong: titleValue.length > 100,
    }),
    [titleValue]
  );

  const handleClose = () => {
    reset();
    closeModal();
  };

  const onSubmit = async (formData: CreatePostFormData) => {
    try {
      await createPost(formData).unwrap();

      notify.success('Post created successfully!');
      handleClose();
    } catch (err) {
      const apiError = err as ApiErrorResponse;
      notify.error(apiError.data?.message || 'Something went wrong. Please try again');
    }
  };

  return (

    <BaseModal
      isOpen={isOpen}
      closeModal={handleClose}
      contentLabel="New Post"
      onSubmit={handleSubmit(onSubmit)}
      isSubmitLoading={isLoading}
      isSubmitDisabled={!isValid || isTitleTooLong}
      headerContent={(
        <div className="modal__header-top">
          <img
            className="modal__header-top-photo"
            src={userProfilePhoto}
            alt="user profile"
          />
          <span className="modal__header-top-title">New Post</span>
        </div>
      )}
    >
      <div className="modal__main-content">
        <Input
          inputName="title"
          register={register}
          required
          errors={
            isTitleTooLong
              ? { message: 'Title cannot exceed 100 characters' }
              : errors?.title
          }
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
      </div>

    </BaseModal>
  );
};

export default CreatePostModal;
