import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FiSave } from "react-icons/fi";

import Modal from 'react-modal';
import toast from 'react-hot-toast';

import './styles.scss';

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
};

type FormData = {
  title?: string;
  content: string;
};

const NewPostModal: FC<Props> = ({ isOpen, onRequestClose }) => {
  const { register, handleSubmit, reset, watch } = useForm<FormData>({
    defaultValues: { title: '', content: '' },
  });

  const title = watch('title');
  const content = watch('content');

  const onSubmit = (data: FormData) => {
    if (!data.content || data.content.trim() === '') return;
    toast.success('Post publicado');
    reset();
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        reset();
        onRequestClose();
      }}
      className="newpost__modal-content"
      overlayClassName="newpost__modal-overlay"
      shouldCloseOnOverlayClick
      contentLabel="New Post"
    >
      <div className="newpost__header simple">
        <h2>New Post</h2>
        <button
          aria-label="Close"
          className="newpost__close-circle"
          onClick={() => {
            reset();
            onRequestClose();
          }}
        >
          <span className="close-x">×</span>
        </button>
      </div>

      <form className="newpost__body" onSubmit={handleSubmit(onSubmit)}>
        <div className="newpost__avatar" />

        <div className="newpost__right">
          <label className="newpost__title-label">
            <input
              {...register('title', { maxLength: 100 })}
              className="newpost__title-input"
              placeholder="Title"
              maxLength={100}
            />
            <div className="newpost__counter">{(title?.length ?? 0)}/100</div>
          </label>

          <textarea
            {...register('content')}
            className="newpost__textarea big"
            placeholder="Share something with your team!"
            rows={6}
          />

          <div className="newpost__footer">
            <div className="newpost__left-actions">
              <button type="button" className="newpost__icon-btn" aria-hidden>
                <FiSave />
              </button>
            </div>

            <button
              type="submit"
              className="newpost__post-btn"
              disabled={!(title && title.trim()) || !(content && content.trim())}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default NewPostModal;
