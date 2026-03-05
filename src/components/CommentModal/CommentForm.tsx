import cn from 'classnames';
import { UseFormRegister, FieldErrorsImpl } from 'react-hook-form';

import { MAX_COMMENT_LENGTH } from '@/constants/limits';

import TextArea from '@/components/TextArea';

import './styles.scss';

type CommentFormProps = {
  register: UseFormRegister<{ content: string }>;
  errors: FieldErrorsImpl<{ content: string }> | undefined;
  commentValue: string;
  isCommentTooLong: boolean;
};

const CommentForm = ({ register, errors, commentValue, isCommentTooLong }: CommentFormProps) => {
  const commentLength = commentValue.length;

  return (
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
  );
};

export default CommentForm;
