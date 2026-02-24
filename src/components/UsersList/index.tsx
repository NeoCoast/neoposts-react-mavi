import { UserData } from '@/ts/interfaces';
import { useGetMeQuery } from '@/services/api';
import UserListItem from '@/components/UsersListItem';

const UsersList = ({
  users,
  onUnfollow,
  onFollow,
}: {
  users: UserData[];
  onUnfollow?: (userId: string | number) => void;
  onFollow?: (userId: string | number) => void;
}) => {
  const hasToken = Boolean(localStorage.getItem('access-token'));
  const { data: me } = useGetMeQuery(undefined, { skip: !hasToken });

  return (
    <div className="users_list">
      {users.map((user) => (
        <UserListItem key={user.id} user={user} onUnfollow={onUnfollow} onFollow={onFollow} meId={me?.id} />
      ))}
    </div>
  );
};

export default UsersList;
