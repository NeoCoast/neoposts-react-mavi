import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { PostComment } from '@/ts/interfaces';
import { createCommentSchema } from '@/utils/validationSchemas';
import { useCreateCommentMutation } from '@/services/api';
import { ROUTES } from '@/constants/routes';

import BaseModal from '@/components/BaseModal';
import TextArea from '@/components/TextArea';
import { notify } from '@/components/Toaster/notify';

import './styles.scss';

const MAX_COMMENT_LENGTH = 300;

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

  const navigate = useNavigate();
  const [createComment, { isLoading }] = useCreateCommentMutation();

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
    try {
      const result = await createComment({
        postId,
        content: formData.content.trim(),
      }).unwrap();

      notify.success('Comment posted');
      onSuccess?.(result);
      handleClose();
      navigate(ROUTES.POST.replace(':id', String(postId)));
    } catch {
      notify.error('Failed to post comment. Please try again.');
    }
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
      <div className="comment-modal__content">
        <TextArea
          inputName="content"
          register={register}
          className="comment-modal__textarea"
          placeholder="Write your comment"
          required
        />

        <div className="comment-modal__meta">
          <div
            className={cn('comment-modal__counter', {
              'comment-modal__counter--error': isCommentTooLong,
            })}
          >
            {commentLength}/{MAX_COMMENT_LENGTH}
          </div>

          {(errors?.content || isCommentTooLong) && (
            <div className="comment-modal__error">
              {isCommentTooLong
                ? `Comment cannot exceed ${MAX_COMMENT_LENGTH} characters.`
                : (errors?.content as { message?: string })?.message}
            </div>
          )}
        </div>
      </div>
    </BaseModal>
  );
};

export default CommentModal;
