import { useEffect, useState } from 'react';

import ProfileSideBar from '@/components/ProfileSideBar';
import { useGetMeQuery } from '@/services/api';
import { User, Profile } from '@/ts/interfaces';

const getCount = (value: unknown): number => {
  if (Array.isArray(value)) return value.length;
  if (typeof value === 'number') return value;

  return 0;
};

const mapUserToProfile = (u: User): Profile => ({
  name: u?.name ?? '-',
  email: u?.email ?? '-',
  posts: getCount(u?.posts),
  following: getCount(u?.followees ?? u?.followed),
  followers: getCount(u?.followers),
});

const UserBar = ({ className }: { className: string }) => {
  const [profile, setProfile] = useState<Profile>({
    name: '-',
    email: '-',
    posts: 0,
    following: 0,
    followers: 0,
  });

  const hasAuthHeaders =
    !!localStorage.getItem('access-token') &&
    !!localStorage.getItem('uid') &&
    !!localStorage.getItem('client');

  const { data: meData } = useGetMeQuery(undefined, {
    skip: !hasAuthHeaders,
  });

  useEffect(() => {
    if (!meData) return;
    setProfile(mapUserToProfile(meData as User));
  }, [meData]);

  return (
    <ProfileSideBar className={className} {...profile} />
  );
};

export default UserBar;
