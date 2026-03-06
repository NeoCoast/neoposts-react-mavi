import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const useUsersFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamValue = searchParams.get('search') ?? '';

  const [search, setSearch] = useState(() => searchParamValue);
  const [debouncedSearch, setDebouncedSearch] = useState(() => searchParamValue);

  const rawPageParam = searchParams.get('page');
  const rawPage = rawPageParam || '1';
  const parsedPage = parseInt(rawPage, 10);
  const isPageInvalid = Number.isNaN(parsedPage) || parsedPage < 1;
  const page = isPageInvalid ? 1 : parsedPage;

  useEffect(() => {
    if (isPageInvalid) {
      setSearchParams({ page: '1' });
    }
  }, [isPageInvalid, setSearchParams, searchParams]);

  useEffect(() => {
    if (debouncedSearch === searchParamValue) {
      return;
    }

    const params: Record<string, string> = { page: '1' };
    if (debouncedSearch) {
      params.search = debouncedSearch;
    }
    setSearchParams(params);
  }, [debouncedSearch, searchParamValue, setSearchParams]);

  useEffect(() => {
    setSearch(searchParamValue);
    setDebouncedSearch(searchParamValue);
  }, [searchParamValue]);

  const handleClearSearch = () => {
    setSearch('');
    setDebouncedSearch('');
    setSearchParams({ page: '1' });
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return {
    page,
    search,
    searchParamValue,
    setSearchParams,
    setDebouncedSearch,
    debouncedSearch,
    handleClearSearch,
    handleSearchChange,
  } as const;
};

export default useUsersFilters;
