import React, { useState } from 'react';
import type { FieldError, UseFormRegister } from 'react-hook-form';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import type { IconType } from 'react-icons';
import './styles.scss';

type InputProps = {
    inputName: string;
    type?: string;
    register?: UseFormRegister<any>;
    required?: boolean;
    errors?: FieldError | { message?: string } | null;
    className?: string;
    placeholder?: string;
};

const Input: React.FC<InputProps> = ({
    inputName,
    type = 'text',
    register,
    required = false,
    errors,
    className = 'input__form',
    placeholder = '',
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const Icon: IconType = showPassword ? IoEyeOffOutline : IoEyeOutline;

    return (
        <div style={{ position: 'relative' }}>
            <input
                id={inputName}
                className={`${className} ${errors ? `${className}-error` : `${className}-normal`}`}
                {...(register ? register(inputName) : {})}
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
