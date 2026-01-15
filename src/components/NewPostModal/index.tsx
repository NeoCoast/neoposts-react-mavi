import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FiSave } from "react-icons/fi";
import Modal from 'react-modal';

import Input from '@/components/Input';

import { ModalProps, FormData } from '@/ts/interfaces';

import './styles.scss';

const NewPostModal: FC<ModalProps> = ({ isOpen, onRequestClose }) => {
  const { register, handleSubmit, reset, watch } = useForm<FormData>({
    defaultValues: { title: '', content: '' },
  });

  const title = watch('title');
  const content = watch('content');

  const onSubmit = (data: FormData) => {
    if (!data.content || data.content.trim() === '') return;
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
            <Input
              inputName={''} {...register('title', { maxLength: 100 })}
              className="newpost__title-input"
              placeholder="Title" />
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
