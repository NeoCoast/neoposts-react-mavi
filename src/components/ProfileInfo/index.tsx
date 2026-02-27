import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { BsPersonCheck } from 'react-icons/bs';
import { GoPersonAdd } from 'react-icons/go';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { useSearchParams } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';

import userProfilePlaceholder from '@/assets/Icons/userProfilePhoto.svg';
import { useFollowUserMutation, useUnfollowUserMutation } from '@/services/api';
import { PostListItem, UserData } from '@/ts/interfaces';

import { notify } from '@/components/Toaster/notify';
import Button from '@/components/Button';
import PostsList from '@/components/PostsList';
import UsersList from '@/components/UsersList';
import EmptyState from '@/components/EmptyState';

import './styles.scss';

type MyProfileInfoProps = {
  name: string;
  email: string;
  postsCount: number;
  followingCount: number;
  followersCount: number;
  posts: PostListItem[];
  following: UserData[];
  followers: UserData[];
  isOwn?: boolean;
  userId?: string | number;
  followed?: boolean;
  isFetching?: boolean;
  onBack: VoidFunction;
  onRetry: VoidFunction;
};
const ProfileInfo = ({
  name,
  email,
  postsCount,
  followingCount,
  followersCount,
  posts = [],
  following = [],
  followers = [],
  isOwn = true,
  userId,
  followed,
  isFetching,
  onBack,
  onRetry,
}: MyProfileInfoProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [followUser, { isLoading: isFollowingLoading }] = useFollowUserMutation();
  const [unfollowUser, { isLoading: isUnfollowingLoading }] = useUnfollowUserMutation();

  const isLoadingFollowingMutation = isFollowingLoading || isUnfollowingLoading;
  const [isFollowedState, setIsFollowedState] = useState(followed);

  const tabParam = searchParams.get('tab') ?? 'posts';
  const tabToIndex: Record<string, number> = { posts: 0, following: 1, followers: 2 };
  const indexToTab = ['posts', 'following', 'followers'];
  const selectedIndex = tabToIndex[tabParam] ?? 0;

  useEffect(() => {
    setIsFollowedState(followed);
  }, [followed]);

  const handleFollow = async () => {
    if (!userId) return;

    setIsFollowedState(true);

    try {
      await followUser(userId);
    } catch (err) {
      notify.error('Unable to follow user.');
      setIsFollowedState(false);
    }
  };

  const handleUnfollow = async () => {
    if (!userId) return;

    setIsFollowedState(false);

    try {
      await unfollowUser(userId);
    } catch (err) {
      notify.error('Unable to unfollow user.');
      setIsFollowedState(true);
    }
  };

  const handleButtonClick = () => {
    if (isLoadingFollowingMutation || isFetching) return;

    if (isFollowedState) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  const handleUnfollowFromList = async (id: string | number) => {
    try {
      await unfollowUser(id);
    } catch (err) {
      notify.error('Unable to unfollow user.');
    }
  };

  const handleFollowFromList = async (id: string | number) => {
    await followUser(id);
  };

  return (
    <article className="my-profile__card">
      <Button
        variant="icon"
        className="my-profile__card-back"
        aria-label="Back"
        onClick={onBack}
      >
        <IoIosArrowBack />
        Back
      </Button>

      <header className="my-profile__card-header">
        <img
          className="my-profile__card-header-avatar"
          src={userProfilePlaceholder}
          alt={name}
        />

        <div className="my-profile__card-header-info">
          <p className="my-profile__card-header-info-name">{name}</p>
          <p className="my-profile__card-header-info-email">{email}</p>
        </div>


        {!isOwn && (
          <div className="my-profile__card-header-action">
            <Button
              variant={isFollowedState ? 'secondary' : 'primary'}
              onClick={handleButtonClick}
            >
              {isFollowedState ? <><BsPersonCheck /> Following</> : <><GoPersonAdd /> Follow</>}
            </Button>
          </div>
        )}
      </header>

      <div className="my-profile__card-separator" />

      <Tabs
        selectedIndex={selectedIndex}
        onSelect={(index: number) => {
          const tab = indexToTab[index] ?? 'posts';

          setSearchParams({ tab });
        }}
      >
        <TabList className="my-profile__card-stats">
          <Tab className="my-profile__card-stats-item" selectedClassName="active">
            <span className="value">{postsCount}</span>
            <span className="label">Posts</span>
          </Tab>

          <Tab className="my-profile__card-stats-item" selectedClassName="active">
            <span className="value">{followingCount}</span>
            <span className="label">Following</span>
          </Tab>

          <Tab className="my-profile__card-stats-item" selectedClassName="active">
            <span className="value">{followersCount}</span>
            <span className="label">Followers</span>
          </Tab>
        </TabList>

        <div className="my-profile__card-separator" />

        <section className="my-profile__card-posts">
          <TabPanel>
            {posts.length === 0 ? (
              <EmptyState>
                {isOwn ? 'You have' : 'This user has'} no posts yet
              </EmptyState>
            ) : (
              <PostsList
                items={posts}
                hasMore={false}
                showContent
                loadedCount={posts.length}
                totalCount={posts.length}
                onRetry={onRetry}
                canLike={followed}
              />
            )}
          </TabPanel>

          <TabPanel>
            {following.length === 0 ? (
              <EmptyState>
                {isOwn ? 'You are not' : 'This user is not'} following anyone yet
              </EmptyState>
            ) : (
              <UsersList
                users={following.map((user) => ({
                  ...user,
                  followed: true,
                }))}
                onUnfollow={handleUnfollowFromList}
              />
            )}
          </TabPanel>

          <TabPanel>
            {followers.length === 0 ? (
              <EmptyState>
                {isOwn ? 'You have' : 'This user has'} no followers yet
              </EmptyState>
            ) : (
              <UsersList
                users={followers.map((user) => ({
                  ...user,
                  followed: following.some((f) => f.id === user.id),
                }))}
                onUnfollow={handleUnfollowFromList}
                onFollow={handleFollowFromList}
              />
            )}
          </TabPanel>
        </section>
      </Tabs>
    </article>
  );
};

export default ProfileInfo;
