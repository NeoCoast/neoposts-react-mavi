import { UserData } from '@/ts/interfaces';
import UserListItem from '@/components/UsersListItem';

const UsersList = ({ users, areUsersLoading = false }: { users: UserData[]; areUsersLoading?: boolean }) => (
  <div className="users_list">
    {users.map((u) => (
      <UserListItem key={u.id} user={u} areUsersLoading={areUsersLoading} />
    ))}
  </div>
);

export default UsersList;
