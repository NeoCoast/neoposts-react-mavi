import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreateCommentMutation } from '@/services/api';
import { notify } from '@/components/Toaster/notify';
import { ROUTES } from '@/constants/routes';
import { PostComment } from '@/ts/interfaces';

type UseCommentModalProps = {
  postId: string | number;
  onSuccess?: (comment: PostComment) => void;
  closeModal: VoidFunction;
};

export const useCommentModal = ({ postId, onSuccess, closeModal }: UseCommentModalProps) => {
  const navigate = useNavigate();
  const [createComment, { isLoading }] = useCreateCommentMutation();

  const submitComment = useCallback(
    async (content: string, reset: VoidFunction) => {
      try {
        const result = await createComment({ postId, content }).unwrap();

        notify.success('Comment posted');
        onSuccess?.(result);
        reset();
        closeModal();
        navigate(ROUTES.POST.replace(':id', String(postId)));
      } catch (err) {
        notify.error('Failed to post comment. Please try again.');
      }
    },
    [createComment, postId, onSuccess, closeModal, navigate]
  );

  return { submitComment, isLoading } as const;
};

export default useCommentModal;
