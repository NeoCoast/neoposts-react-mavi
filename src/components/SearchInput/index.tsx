import { FiSearch } from 'react-icons/fi';
import { RxCross1 } from 'react-icons/rx';

import { SearchBarProps } from '@/ts/interfaces';
import Input from '@/components/Input';

import './styles.scss';

const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search',
  ariaLabel = 'Search',
  inputName = 'search',
  wrapperClass = 'users__layout-usersList-search',
}: SearchBarProps) => {
  const iconClass = `${wrapperClass}-icon`;
  const crossClass = `${wrapperClass}-cross`;

  return (
    <div className={wrapperClass}>
      <FiSearch className={iconClass} />
      <Input
        placeholder={placeholder}
        aria-label={ariaLabel}
        inputName={inputName}
        value={value}
        onChange={onChange}
      />

      {value !== '' && (
        <button
          type="button"
          className={crossClass}
          aria-label="Clear search"
          onClick={onClear}
        >
          <RxCross1 />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
