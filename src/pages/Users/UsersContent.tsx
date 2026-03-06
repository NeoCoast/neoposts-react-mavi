import { Oval } from 'react-loader-spinner';

import { User } from '@/ts/interfaces';

import UsersList from '@/components/UsersList';
import Button from '@/components/Button';
import Pagination from '@/components/Pagination';

type UsersContentProps = {
  isLoading: boolean;
  hasError: boolean;
  totalCount: number;
  displayedUsers: User[];
  shouldShowPagination: boolean;
  page: number;
  totalPages: number;
  searchParamValue: string;
  onRetry: VoidFunction;
};

const UsersContent = ({
  isLoading,
  hasError,
  totalCount,
  displayedUsers,
  shouldShowPagination,
  page,
  totalPages,
  searchParamValue,
  onRetry,
}: UsersContentProps) => {
  if (isLoading) {
    return (
      <div className="users__layout-usersList-loader">
        <Oval
          visible
          height="60"
          width="60"
          color="#0F31AA"
          secondaryColor="#1445D8"
        />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="users__layout-usersList-loader">
        <div>
          <p>Unable to load users. Please try again.</p>
          <Button onClick={onRetry}>Retry</Button>
        </div>
      </div>
    );
  }

  if (totalCount === 0) {
    return <div className="users__layout-usersList-loader">No users found.</div>;
  }

  return (
    <>
      <UsersList users={displayedUsers} />
      {shouldShowPagination && (
        <Pagination
          page={page}
          totalPages={totalPages}
          className="users__layout-usersList-pagination"
          searchQuery={searchParamValue || undefined}
        />
      )}
    </>
  );
};

export default UsersContent;
