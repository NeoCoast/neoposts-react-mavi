import { ThreeDots } from 'react-loader-spinner';
import './styles.scss';
import { FC, ReactNode, MouseEventHandler } from 'react';

type ButtonProps = {
    isLoading?: boolean;
    variant: string;
    title: string | ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    disabled?: boolean;
};

const Button: FC<ButtonProps> = ({
    disabled = false,
    isLoading = false,
    title,
    onClick = () => { },
    type = 'button',
    className = '',
    variant,
}) => (
    <button
        onClick={onClick}
        type={type}
        className={`btn ${variant} ${className}`}
        disabled={disabled || isLoading}
    >
        {isLoading ? (
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