import React, { useState } from 'react';
import cn from 'classnames';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import type { IconType } from 'react-icons';

import { InputProps } from '@/ts/interfaces';

import './styles.scss';

const Input: React.FC<InputProps> = ({
  inputName,
  type = 'text',
  register,
  required = false,
  errors,
  className = 'input__form',
  placeholder = '',
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const Icon: IconType = showPassword ? IoEyeOffOutline : IoEyeOutline;

  return (
    <div style={{ position: 'relative' }}>
      <input
        id={inputName}
        className={cn(
          className,
          {
            [`${className}--error`]: errors,
          }
        )}
        {...(register ? register(inputName) : {})}
        {...rest}
        type={type === 'password' && showPassword ? 'text' : type}
        name={inputName}
        required={required}
        placeholder={placeholder}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck={false}
      />
      {type === 'password' && (
        <button
          type="button"
          className="input__password-toggle"
          onClick={() => setShowPassword((show) => !show)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          aria-pressed={showPassword}
        >
          <Icon
            className="input__password-eye"
            aria-hidden="true"
            focusable="false"
          />
        </button>
      )}
      <div className={errors ? 'input__error' : 'input__error--hidden'}>{errors?.message as string}</div>
    </div>
  );
};

export default Input;
