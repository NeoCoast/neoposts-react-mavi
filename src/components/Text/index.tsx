import { TextProps } from '@/ts/interfaces';

import './styles.scss';

const Text = ({
  inputName,
  register,
  required = false,
  placeholder = '',
  className = '',
}: TextProps) => (
  <textarea
    className={`text-area ${className}`}
    id={inputName}
    {...register(inputName)}
    required={required}
    placeholder={placeholder}
  />
);

export default Text;
