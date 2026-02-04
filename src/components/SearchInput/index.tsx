import { useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { RxCross1 } from 'react-icons/rx';
import cn from 'classnames';

import { SearchBarProps } from '@/ts/interfaces';
import Input from '@/components/Input';
import Button from '@/components/Button';

import './styles.scss';

const SearchInput = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search',
  ariaLabel = 'Search',
  inputName = 'search',
  wrapperClass,
  debouncedSearch,
  setDebouncedSearch,
  setPage,
}: SearchBarProps) => {

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch?.(value), 200);
    return () => clearTimeout(t);
  }, [value, setDebouncedSearch]);

  useEffect(() => {
    setPage?.(1);
  }, [debouncedSearch, setPage]);

  return (
    <div className={cn('search_input', wrapperClass)}>
      <FiSearch className="search_input-icon" />
      <Input
        placeholder={placeholder}
        aria-label={ariaLabel}
        inputName={inputName}
        value={value}
        onChange={onChange}
      />

      {!!value && (
        <div>
          <Button
            className="search_input-cross"
            onClick={onClear}
            title={<RxCross1 />}
          />
        </div>
      )}
    </div>
  );
};

export default SearchInput;
