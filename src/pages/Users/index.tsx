import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

import { useGetUsersQuery } from '@/services/api';
import { User } from '@/ts/interfaces';
import { ROUTES } from '@/constants/routes';
import UsersContent from '@/pages/Users/UsersContent';
import useUsersFilters from '@/utils/useUsersFilters';

import SearchInput from '@/components/SearchInput';
import Button from '@/components/Button';

import './styles.scss';

const PER_PAGE_DEFAULT = 25;

const Users = () => {
  const navigate = useNavigate();
  const {
    page,
    search,
    searchParamValue,
    setSearchParams,
    setDebouncedSearch,
    debouncedSearch,
    handleClearSearch,
    handleSearchChange,
  } = useUsersFilters();

  const { data, error, isLoading, refetch } = useGetUsersQuery({
    search: debouncedSearch || undefined,
    page,
    per_page: PER_PAGE_DEFAULT,
  });

  const users = (data?.users ?? []) as User[];
  const meta = data?.meta;
  const totalCount = meta?.total_count ?? users.length;
  const totalPages = meta?.total_pages ?? Math.max(1, Math.ceil(totalCount / PER_PAGE_DEFAULT));
  const shouldShowPagination = totalPages > 1;
  const startIndex = (page - 1) * PER_PAGE_DEFAULT;
  const endIndex = startIndex + PER_PAGE_DEFAULT;
  const displayedUsers = users.slice(startIndex, endIndex);

  const isValidPage = page >= 1 && page <= totalPages;

  useEffect(() => {
    if (!isValidPage && data) {
      const params: Record<string, string> = { page: '1' };
      if (searchParamValue) {
        params.search = searchParamValue;
      }
      setSearchParams(params);
    }
  }, [page, totalPages, setSearchParams, isValidPage, data, searchParamValue]);

  return (
    <div className="users">
      <div className="users__layout-usersList">
        <div className="users__layout-usersList-card">
          <div className="users__layout-usersList-header">
            <div className="users__layout-usersList-header-back">
              <Button
                variant='icon'
                className="users__layout-usersList-header-button"
                onClick={() => navigate(ROUTES.HOME)}
              >
                <IoIosArrowBack />
                <span>Back</span>
              </Button>
            </div>
            <h2>Users</h2>
          </div>

          <SearchInput
            value={search}
            onChange={handleSearchChange}
            onClear={handleClearSearch}
            placeholder="Search by name or email"
            ariaLabel="Search users"
            inputName="searchUsers"
            wrapperClass="users__layout-usersList-search"
            setDebouncedSearch={setDebouncedSearch}
          />

          <UsersContent
            isLoading={isLoading}
            hasError={Boolean(error)}
            totalCount={totalCount}
            displayedUsers={displayedUsers}
            shouldShowPagination={shouldShowPagination}
            page={page}
            totalPages={totalPages}
            searchParamValue={searchParamValue}
            onRetry={refetch}
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
