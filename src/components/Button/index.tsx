import { FC, ReactNode, MouseEventHandler } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import cn from 'classnames';

import './styles.scss';

type ButtonProps = {
  loading?: boolean;
  variant?: string;
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
    className={cn('btn', variant, className)}
    disabled={disabled || loading}
  >
    {loading ? (
      <ThreeDots
        visible={true}
        height="40"
        width="40"
        radius="9"
        ariaLabel="three-dots-loading"
      />
    ) : (
      title
    )}
  </button>
);

export default Button;
