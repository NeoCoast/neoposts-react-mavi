import { UserData } from '@/ts/interfaces';
import { useGetMeQuery } from '@/services/api';
import UserListItem from '@/components/UsersListItem';

const UsersList = ({
  users,
  onUnfollow,
}: {
  users: UserData[];
  onUnfollow?: (userId: string | number) => void;
}) => {
  const { data: me } = useGetMeQuery();
  return (
    <div className="users_list">
      {users.map((user) => (
        <UserListItem key={user.id} user={user} onUnfollow={onUnfollow} meId={me?.id} />
      ))}
    </div>
  );
};

export default UsersList;
