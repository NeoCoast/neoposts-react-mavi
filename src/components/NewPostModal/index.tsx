import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FiSave } from 'react-icons/fi';
import Modal from 'react-modal';

import Input from '@/components/Input';

import { ModalProps, FormData } from '@/ts/interfaces';

import './styles.scss';

const NewPostModal: FC<ModalProps> = ({ isOpen, closeModal }) => {
  const { register, handleSubmit, reset, watch } = useForm<FormData>({
    defaultValues: { title: '', body: '' },
  });

  const title = watch('title');
  const body = watch('body');

  const onSubmit = (data: FormData) => {
    if (!data.body || data.body.trim() === '') return;
    reset();
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        reset();
        closeModal();
      }}
      className="newpost__modal"
      overlayClassName="newpost__modal-overlay"
      shouldCloseOnOverlayClick
      contentLabel="New Post"
    >
      <div className="newpost__modal-header simple">
        <h2>New Post</h2>
        <button
          aria-label="Close"
          className="newpost__modal-header-close"
          onClick={() => {
            reset();
            closeModal();
          }}
        >
          <span className="newpost__modal-header-close-x">×</span>
        </button>
      </div>

      <form className="newpost__modal-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="newpost__modal-form-avatar" />

        <div className="newpost__modal-form-right">
          <label className="newpost__modal-form-right-label">
            <Input
              inputName={'title'} {...register('title', { maxLength: 100 })}
              className="newpost__modal-form-right-label-input"
              placeholder="Title" />
          </label>

          <textarea
            {...register('body')}
            className="newpost__modal-form-right-textarea big"
            placeholder="Share something with your team!"
            rows={6}
          />

          <div className="newpost__modal-footer">
            <div className="newpost__modal-footer-left">
              <span className="newpost__modal-footer-left-icon" aria-hidden="true">
                <FiSave />
              </span>
            </div>

            <button
              type="submit"
              className="newpost__modal-footer-btn"
              disabled={!(title && title.trim()) || !(body && body.trim())}
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
