import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ProfileSideBar from '@/components/ProfileSideBar';
import { useGetMeQuery } from '@/services/api';
import { User, Profile } from '@/ts/interfaces';
import { ROUTES } from '@/constants/routes';

const getCount = (value: unknown): number => {
  if (Array.isArray(value)) return value.length;
  if (typeof value === 'number') return value;

  return 0;
};

const mapUserToProfile = (u: User): Profile => ({
  name: u?.name ?? '-',
  email: u?.email ?? '-',
  posts: getCount(u?.posts),
  followees: getCount(u?.followees),
  followers: getCount(u?.followers),
});

const UserBar = ({ className }: { className: string }) => {
  const { pathname } = useLocation();
  const [profile, setProfile] = useState<Profile>({
    name: '-',
    email: '-',
    posts: 0,
    followees: 0,
    followers: 0,
  });

  const hasAuth = Boolean(localStorage.getItem('access-token'));

  const { data: meData } = useGetMeQuery(undefined, {
    skip: !hasAuth,
  });

  useEffect(() => {
    if (!meData) return;
    setProfile(mapUserToProfile(meData as User));
  }, [meData]);

  const actionsOnly = pathname === ROUTES.MY_PROFILE;

  return (
    <ProfileSideBar className={className} actionsOnly={actionsOnly} {...profile} />
  );
};

export default UserBar;
