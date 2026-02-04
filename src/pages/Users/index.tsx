import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { Oval } from 'react-loader-spinner';

import { useGetUsersQuery } from '@/services/api';
import { User } from '@/ts/interfaces';
import { ROUTES } from '@/constants/routes';

import Navbar from '@/components/Navbar';
import UserBar from '@/components/UserBar';
import UsersList from '@/components/UsersList';
import SearchBar from '@/components/SearchInput';
import Button from '@/components/Button';
import Pagination from '@/components/Pagination';

import './styles.scss';

const PER_PAGE_DEFAULT = 25;

const Users = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);

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

  const handleClearSearch = () => {
    setSearch('');
    setDebouncedSearch('');
    setPage(1);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="users">
      <Navbar />

      <div className="users__layout">
        <UserBar className="users__layout-sidebar" />

        <div className="users__layout-usersList">
          <div className="users__layout-usersList-card">
            <div className="users__layout-usersList-header">
              <div className="users__layout-usersList-header-back">
                <IoIosArrowBack />
                <Button
                  className="users__layout-usersList-header-button"
                  onClick={() => navigate(ROUTES.HOME)}
                  title=" Back"
                />
              </div>
              <h2>Users</h2>
            </div>

            <SearchBar
              value={search}
              onChange={handleSearchChange}
              onClear={handleClearSearch}
              placeholder="Search"
              ariaLabel="Search users"
              inputName="searchUsers"
              wrapperClass="users__layout-usersList-search"
              debouncedSearch={debouncedSearch}
              setDebouncedSearch={setDebouncedSearch}
              setPage={setPage}
            />

            {isLoading && (
              <div className="users__layout-usersList-loader">
                <Oval
                  visible
                  height="60"
                  width="60"
                  color="#0F31AA"
                  secondaryColor="#1445D8"
                />
              </div>
            )}

            {!isLoading && error && (
              <div className="users__layout-usersList-error">
                <div className="users__layout-usersList-error-content">
                  <p>Unable to load users. Please try again.</p>
                  <Button
                    title="Retry"
                    onClick={() => refetch()}
                    className="users__layout-usersList-error-retry"
                  />
                </div>
              </div>
            )}

            {!isLoading && !error && totalCount === 0 && (
              <div className="users__layout-usersList-empty">No users found.</div>
            )}

            {!isLoading && !error && totalCount > 0 && (
              <>
                <UsersList users={displayedUsers} />
                {shouldShowPagination && (
                  <Pagination
                    className="users__layout-usersList-pagination"
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
