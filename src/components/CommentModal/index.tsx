import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import cn from 'classnames';

import { useCreateCommentMutation } from '@/services/api';
import { createCommentSchema } from '@/utils/validationSchemas';
import { ROUTES } from '@/constants/routes';

import { notify } from '@/components/Toaster/notify';
import Button from '@/components/Button';
import TextArea from '@/components/TextArea';

import './styles.scss';

Modal.setAppElement('#root');

type Props = {
  isOpen: boolean;
  closeModal: VoidFunction;
  postId: string | number;
  onSuccess?: (comment: any) => void;
};

const MAX_LENGTH = 300;

const CommentModal = ({ isOpen, closeModal, postId, onSuccess }: Props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

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

  const [createComment, { isLoading: apiLoading }] = useCreateCommentMutation();

  const commentLength = (watch('content') || '').length;
  const isTooLong = commentLength > MAX_LENGTH;
  const contentValue = watch('content') || '';
  const isLoading = isSubmitting || apiLoading;

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: { content: string }) => {
    try {
      const result = await createComment({ postId, content: data.content.trim() }).unwrap();

      notify.success('Comment posted');

      if (onSuccess) onSuccess(result);

      reset();
      closeModal();

      navigate(ROUTES.POST.replace(':id', String(postId)));
    } catch (err) {
      notify.error('Failed to post comment. Please try again.');
    }
  };

  const handleClose = () => {
    reset();
    closeModal();
    setTimeout(() => {
      navigate(pathname, { replace: true });
    }, 0);
  };

  const handleDisableSubmit = () => {
    return isLoading || contentValue.trim().length === 0 || commentLength > MAX_LENGTH;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Add comment"
      className="modal"
      overlayClassName="modal__background"
    >
      <div className="modal__header">
        <h1 className="modal__header-title">Create comment</h1>
        <Button
          variant="icon"
          className="modal__header-title-close"
          onClick={handleClose}
          aria-label="Close"
        >
          &times;
        </Button>
      </div>

      <form
        className="modal__main"
        onSubmit={handleSubmit(onSubmit)}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <TextArea
          inputName="content"
          register={register}
          className="modal__main-textarea"
          placeholder="Write your comment"
          required
        />

        <div className="modal__main-meta">
          <div className={cn('modal__main-meta-counter', { 'modal__main-meta-counter-error': isTooLong })}>{commentLength}/{MAX_LENGTH}</div>
          {(errors?.content || isTooLong) && (
            <div className="modal__main-meta-counter-error">
              {isTooLong ? `Comment cannot exceed ${MAX_LENGTH} characters.` : (errors?.content as any)?.message}
            </div>
          )}
        </div>

        <div className="modal__main-actions">
          <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
            disabled={handleDisableSubmit()}
          >
            Comment
          </Button>
        </div>
      </form>
    </Modal >
  );
};

export default CommentModal;
