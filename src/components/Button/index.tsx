import { FC, ReactNode, MouseEventHandler } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import cn from 'classnames';

import './styles.scss';

type ButtonProps = {
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'icon';
  title: string | ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({
  disabled = false,
  loading = false,
  title,
  onClick = () => { },
  type = 'button',
  className = '',
  variant = 'primary',
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
        title
      )}
    </span>
  </button>
);

export default Button;
