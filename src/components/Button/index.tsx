import { FC, ReactNode, MouseEventHandler } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import cn from 'classnames';

import './styles.scss';

type ButtonProps = {
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'icon';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  children?: ReactNode;
};

const Button: FC<ButtonProps> = ({
  disabled = false,
  loading = false,
  onClick = () => { },
  type = 'button',
  className = '',
  variant = 'primary',
  children,
}) => (
  <button
    onClick={onClick}
    type={type}
    className={cn('btn', className, {
      'btn--loading': loading,
      [`btn--${variant}`]: variant,
    })}
    disabled={disabled || loading}
  >
    <span className="btn__content">
      {loading ? (
        <ThreeDots
          height="35"
          width="35"
          radius="8"
          ariaLabel="button-loading"
          color="currentColor"
        />
      ) : (
        children
      )}
    </span>
  </button>
);

export default Button;
