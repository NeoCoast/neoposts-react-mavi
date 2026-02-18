import { IoIosArrowBack } from 'react-icons/io';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { useSearchParams } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import { useEffect, useState } from 'react';

import { useGetMeQuery, useFollowUserMutation, useUnfollowUserMutation } from '@/services/api';
import userProfilePlaceholder from '@/assets/Icons/userProfilePhoto.svg';
import { PostListItem, UserData } from '@/ts/interfaces';

import { notify } from '@/components/Toaster/notify';
import Button from '@/components/Button';
import PostsList from '@/components/PostsList';
import UsersList from '@/components/UsersList';

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
  onBack: () => void;
  onRetry: () => void;
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
  onBack,
  onRetry,
}: MyProfileInfoProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: me } = useGetMeQuery();
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  const [isFollowed, setIsFollowed] = useState<boolean | undefined>(undefined);
  const [followersCountState, setFollowersCountState] = useState<number>(followersCount);
  const [followingCountState, setFollowingCountState] = useState<number>(followingCount);

  useEffect(() => {
    if (me) {
      const follows = followers.some((f) => f.id === me.id);
      setIsFollowed(follows);
    }
    setFollowersCountState(followersCount);
    setFollowingCountState(followingCount);
  }, [me, followers, followersCount, followingCount]);
  const tabParam = searchParams.get('tab') ?? 'posts';
  const tabToIndex: Record<string, number> = { posts: 0, following: 1, followers: 2 };
  const indexToTab = ['posts', 'following', 'followers'];
  const selectedIndex = tabToIndex[tabParam] ?? 0;


  const sortedPosts = [...posts].sort((a: PostListItem, b: PostListItem) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();
    return dateB - dateA;
  });

  const handleFollow = async () => {
    if (!userId) return;
    try {
      await followUser(userId).unwrap();
      setIsFollowed(true);
      setFollowersCountState((c) => c + 1);
    } catch (e) {
      notify.error('Unable to follow user. Please try again.');
    }
  };

  const handleUnfollow = async () => {
    if (!userId) return;
    try {
      await unfollowUser(userId).unwrap();
      setIsFollowed(false);
      setFollowersCountState((c) => Math.max(0, c - 1));
    } catch (e) {
      notify.error('Unable to unfollow user. Please try again.');
    }
  };

  return (
    <article className="my-profile__card">
      <Button
        variant="icon"
        className="my-profile__card-back"
        aria-label="Back"
        onClick={onBack}
        title={
          <>
            <IoIosArrowBack />
            <span>Back</span>
          </>
        }
      />

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
        {!isOwn && me?.id !== userId && isFollowed !== undefined && (
          <div className="my-profile__card-header-action">
            <Button
              title={isFollowed ? 'Unfollow' : 'Follow'}
              variant={isFollowed ? 'secondary' : 'primary'}
              onClick={isFollowed ? handleUnfollow : handleFollow}
            />
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
              <div className="my-profile__card-posts-empty">
                <p className="my-profile__card-posts-empty-title">
                  {isOwn ? 'You have no posts yet' : "This user hasn't published any posts yet"}
                </p>
              </div>
            ) : (
              <PostsList
                items={sortedPosts}
                fetchMore={() => { }}
                hasMore={false}
                showContent={true}
                loadedCount={posts.length}
                totalCount={posts.length}
                pageError={undefined}
                onRetry={onRetry}
              />
            )}
          </TabPanel>

          <TabPanel>
            {following.length === 0 ? (
              <div className="my-profile__card-posts-empty">
                <p className="my-profile__card-posts-empty-title">
                  {isOwn ? 'You are not following anyone' : 'This user is not following anyone'}
                </p>
              </div>
            ) : (
              <UsersList users={following} />
            )}
          </TabPanel>

          <TabPanel>
            {followers.length === 0 ? (
              <div className="my-profile__card-posts-empty">
                <p className="my-profile__card-posts-empty-title">
                  {isOwn ? 'You have no followers' : 'This user has no followers yet'}
                </p>
              </div>
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
