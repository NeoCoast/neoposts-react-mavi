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
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  const [followersCountState, setFollowersCountState] = useState<number>(followersCount);
  const [followingCountState, setFollowingCountState] = useState<number>(followingCount);
  const [isLoadingFollowingMutation, setIsLoadingFollowingMutation] = useState(false);
  const [isFollowedState, setIsFollowedState] = useState(followed);

  const tabParam = searchParams.get('tab') ?? 'posts';
  const tabToIndex: Record<string, number> = { posts: 0, following: 1, followers: 2 };
  const indexToTab = ['posts', 'following', 'followers'];
  const selectedIndex = tabToIndex[tabParam] ?? 0;

  useEffect(() => {
    setFollowingCountState(following.length);
  }, [following]);

  useEffect(() => {
    setFollowersCountState(followersCount);
  }, [followersCount]);

  useEffect(() => {
    setFollowingCountState(followingCount);
  }, [followingCount]);

  useEffect(() => {
    setIsFollowedState(followed);
  }, [followed]);


  const handleFollow = async () => {
    if (!userId) return;

    setIsLoadingFollowingMutation(true);
    setIsFollowedState(true);

    try {
      await followUser(userId).unwrap();

      setFollowersCountState(prev => prev + 1);
    } catch (err) {
      notify.error('Unable to follow user.');
    } finally {
      setIsLoadingFollowingMutation(false);
    }
  };

  const handleUnfollow = async () => {
    if (!userId) return;

    setIsFollowedState(false);
    setIsLoadingFollowingMutation(true);

    try {
      await unfollowUser(userId).unwrap();

      setFollowersCountState(prev => prev - 1);
    } catch (err) {
      notify.error('Unable to unfollow user.');
    } finally {
      setIsLoadingFollowingMutation(false);
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
      await unfollowUser(id).unwrap();

      setFollowingCountState(prev => prev - 1);

    } catch (err) {
      notify.error('Unable to unfollow user.');
    }
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
            <span className="value">{followingCountState}</span>
            <span className="label">Following</span>
          </Tab>

          <Tab className="my-profile__card-stats-item" selectedClassName="active">
            <span className="value">{followersCountState}</span>
            <span className="label">Followers</span>
          </Tab>
        </TabList>

        <div className="my-profile__card-separator" />

        <section className="my-profile__card-posts">
          <TabPanel>
            {posts.length === 0 ? (
              <EmptyState
                title={`${isOwn ? 'You have' : 'This user has'} no posts`}
              />
            ) : (
              <PostsList
                items={posts}
                hasMore={false}
                showContent
                loadedCount={posts.length}
                totalCount={posts.length}
                onRetry={onRetry}
              />
            )}
          </TabPanel>

          <TabPanel>
            {following.length === 0 ? (
              <EmptyState
                title={`${isOwn ? 'You are' : 'This user is'} following anyone`}
              />
            ) : (
              <UsersList
                users={following.map((user) => ({
                  ...user,
                  followed: true,
                  onUnfollow: () => handleUnfollowFromList(user.id),
                }))}
              />
            )}
          </TabPanel>

          <TabPanel>
            {followers.length === 0 ? (
              <EmptyState
                title={`${isOwn ? 'You have no' : 'This user has no'} followers`}
              />
            ) : (
              <UsersList users={followers} />
            )}
          </TabPanel>
        </section>
      </Tabs>
    </article>
  );
};

export default ProfileInfo;
