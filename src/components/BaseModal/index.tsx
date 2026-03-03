import { ReactNode, FormEventHandler, MouseEventHandler } from 'react';
import Modal from 'react-modal';

import Button from '@/components/Button';

import './styles.scss';


export type BaseModalProps = {
  isOpen: boolean;
  closeModal: VoidFunction;
  contentLabel?: string;
  submitLabel?: string;
  headerContent?: ReactNode;
  children: ReactNode;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  isSubmitDisabled?: boolean;
  isSubmitLoading?: boolean;
};

const BaseModal = ({
  isOpen,
  closeModal,
  contentLabel,
  submitLabel = 'Submit',
  headerContent,
  children,
  onSubmit,
  isSubmitDisabled = false,
  isSubmitLoading = false,
}: BaseModalProps) => {
  const stopModalEventPropagation: MouseEventHandler<HTMLFormElement> = (event) => {
    event.stopPropagation();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel={contentLabel}
      className="base-modal"
      overlayClassName="base-modal__overlay"
    >
      <form
        className="base-modal__form"
        onSubmit={onSubmit}
        onClick={stopModalEventPropagation}
        onMouseDown={stopModalEventPropagation}
      >
        <div className="base-modal__header">
          {headerContent ?? <h2 className="base-modal__title">{contentLabel}</h2>}

          <Button
            type="button"
            variant="icon"
            className="base-modal__close"
            onClick={closeModal}
            aria-label="Close modal"
          >
            &times;
          </Button>
        </div>

        <div className="base-modal__content">{children}</div>

        <div className="base-modal__footer">
          <Button
            type="button"
            variant="secondary"
            onClick={closeModal}
            disabled={isSubmitLoading}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            loading={isSubmitLoading}
            disabled={isSubmitDisabled}
          >
            {submitLabel}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default BaseModal;
