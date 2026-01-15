import type { FieldErrors } from 'react-hook-form';

import { TextProps } from '@/ts/interfaces';

import './styles.scss';

const Text = ({
  inputName,
  register,
  required = false,
  placeholder = '',
  className = '',
  errors,
}: TextProps & { errors?: FieldErrors }) => {
  const error = errors?.[inputName];
  const message = error?.message;

  return (
    <div className="text-area-wrapper">
      <textarea
        className={`text-area ${error ? 'text-area--error' : ''} ${className}`}
        id={inputName}
        {...(register?.(inputName) ?? {})}
        required={required}
        placeholder={placeholder}
      />
      {typeof message === 'string' && (
        <p className="text-area__error-message">{message}</p>
      )}
    </div>
  );
};
export default Text;
