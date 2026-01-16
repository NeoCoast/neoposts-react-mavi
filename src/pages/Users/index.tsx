import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';

import { useGetUsersQuery } from '@/services/api';
import { User } from '@/ts/interfaces';
import { ApiErrorResponse } from '@/ts/types/errors';
import { ROUTES } from '@/constants/routes';

import Navbar from '@/components/Navbar';
import UserBar from '@/components/UserBar';
import UsersList from '@/components/UsersList';
import Input from '@/components/Input';
import Button from '@/components/Button';

import './styles.scss';

const Users = () => {
  const [search] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(25);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const { data, error, isLoading } = useGetUsersQuery({
    search: debouncedSearch || undefined,
    page,
    per_page: perPage,
  });

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const users = (data?.users ?? []) as User[];
  const navigate = useNavigate();

  return (
    <div className="users">
      <Navbar />

      <div className="users__layout">
        <UserBar className="users__layout-sidebar" />

        <div className="users__layout-usersList">
          <div className="users__layout-usersList-card">
            <div className="users__layout-usersList-header">
              <Button
                className="users__layout-usersList-header-back"
                onClick={() => navigate(ROUTES.HOME)}
                variant=""
                title="<   Back"
              />
              <h2>Users</h2>
            </div>

            <div className="users__layout-usersList-search">
              <Input
                placeholder="Search"
                aria-label="Search users"
                inputName="searchUsers"
              />
            </div>

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
                {String(
                  (error as ApiErrorResponse)?.data?.message ??
                  'Failed to load users'
                )}
              </div>
            )}

            {!isLoading && !error && users.length === 0 && (
              <div className="users__layout-usersList-empty">
                No users found.
              </div>
            )}

            {!isLoading && !error && users.length > 0 && (
              <UsersList users={users} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
