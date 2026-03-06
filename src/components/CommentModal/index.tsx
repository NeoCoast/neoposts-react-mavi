import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { PostComment } from '@/ts/interfaces';
import { createCommentSchema } from '@/utils/validationSchemas';
import { MAX_COMMENT_LENGTH } from '@/constants/limits';

import BaseModal from '@/components/BaseModal';
import useCommentModal from '@/components/CommentModal/useCommentModal';
import CommentForm from '@/components/CommentModal/CommentForm';

import './styles.scss';

type Props = {
  isOpen: boolean;
  closeModal: VoidFunction;
  postId: string | number;
  onSuccess?: (comment: PostComment) => void;
};

const CommentModal = ({ isOpen, closeModal, postId, onSuccess }: Props) => {

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<{ content: string }>({
    resolver: zodResolver(createCommentSchema),
    mode: 'onChange',
    defaultValues: { content: '' },
  });

  const { submitComment, isLoading } = useCommentModal({ postId, onSuccess, closeModal });

  const commentValue = watch('content') || '';
  const commentLength = commentValue.length;
  const isCommentTooLong = commentLength > MAX_COMMENT_LENGTH;
  const isCommentLoading = isSubmitting || isLoading;

  const isCommentSubmitDisabled = useMemo(
    () => isCommentLoading || commentValue.trim().length === 0 || isCommentTooLong,
    [isCommentLoading, commentValue, isCommentTooLong]
  );

  const handleClose = () => {
    reset();
    closeModal();
  };

  const onSubmit = async (formData: { content: string }) => {
    await submitComment(formData.content.trim(), () => reset());
  };

  return (
    <BaseModal
      isOpen={isOpen}
      closeModal={handleClose}
      contentLabel="Add comment"
      submitLabel="Comment"
      onSubmit={handleSubmit(onSubmit)}
      isSubmitLoading={isCommentLoading}
      isSubmitDisabled={isCommentSubmitDisabled}
    >
      <CommentForm
        register={register}
        errors={errors}
        commentValue={commentValue}
        isCommentTooLong={isCommentTooLong}
      />
    </BaseModal>
  );
};

export default CommentModal;
