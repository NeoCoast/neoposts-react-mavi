import type { FieldErrors } from 'react-hook-form';
import cn from 'classnames';

import { TextProps } from '@/ts/interfaces';

import './styles.scss';

const TextArea = ({
  inputName,
  register,
  required = true,
  placeholder = '',
  className = '',
  errors,
}: TextProps & { errors?: FieldErrors }) => {
  const error = errors?.[inputName];
  const message = error?.message;

  return (
    <div className="text-area-wrapper">
      <textarea
        className={cn('text-area', className, {
          'text-area--error': !!error,
          [
            `${className}--error`
          ]: !!error && !!className,
        })}
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
export default TextArea;
