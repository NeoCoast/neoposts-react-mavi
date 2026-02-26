import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import cn from 'classnames';

import { useCreateCommentMutation } from '@/services/api';
import { notify } from '@/components/Toaster/notify';
import Button from '@/components/Button';

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
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [createComment, { isLoading }] = useCreateCommentMutation();

  const commentLength = content.length;
  const isTooLong = commentLength > MAX_LENGTH;

  useEffect(() => {
    if (!isOpen) {
      setContent('');
      setError(null);
    }
  }, [isOpen]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    const trimmed = content.trim();

    if (trimmed.length === 0) {
      setError('Comment cannot be empty.');
      return;
    }

    if (trimmed.length > MAX_LENGTH) {
      setError(`Comment cannot exceed ${MAX_LENGTH} characters.`);
      return;
    }

    setError(null);

    try {
      const result = await createComment({ postId, content: trimmed }).unwrap();

      notify.success('Comment posted');

      if (onSuccess) onSuccess(result);

      setContent('');
      closeModal();
    } catch (err: unknown) {
      setError('Failed to post comment. Please try again.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add comment"
      className="modal"
      overlayClassName="modal__background"
    >
      <div className="modal__header">
        < h1 className="modal__header-title">Create comment</h1 >
        <Button
          type="button"
          variant="icon"
          className="modal__header-title-close"
          onClick={closeModal}
          aria-label="Close"
        >
          ×
        </Button>
      </div >

      <form className="modal__main" onSubmit={handleSubmit}>
        <textarea
          className="modal__main-textarea"
          aria-label="Write your comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
        />

        <div className="modal__main-meta">
          <div className={cn('modal__main-meta-counter', { 'modal__main-meta-counter-error': isTooLong })}>{commentLength}/{MAX_LENGTH}</div>
          {(error || isTooLong) && (
            <div className="modal__main-meta-counter-error">
              {isTooLong ? `Comment cannot exceed ${MAX_LENGTH} characters.` : error}
            </div>
          )}
        </div>

        <div className="modal__main-actions">
          <Button type="button" variant="secondary" onClick={closeModal} disabled={isLoading}>
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
            disabled={isLoading || content.trim().length === 0 || commentLength > MAX_LENGTH}
          >
            Comment
          </Button>
        </div>
      </form>
    </Modal >
  );
};

export default CommentModal;
