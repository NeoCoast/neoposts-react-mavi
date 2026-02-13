import { IoIosArrowBack } from 'react-icons/io';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { useSearchParams } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';

import userProfilePlaceholder from '@/assets/Icons/userProfilePhoto.svg';
import { PostListItem } from '@/ts/interfaces';

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
  followees: any[];
  followers: any[];
  isOwn?: boolean;
  onBack: () => void;
  onRetry: () => void;
};

const ProfileInfo = ({
  name,
  email,
  postsCount,
  followingCount,
  followersCount,
  posts,
  followees,
  followers,
  isOwn = true,
  onBack,
  onRetry,
}: MyProfileInfoProps) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') ?? 'posts';
  const tabToIndex: Record<string, number> = { posts: 0, following: 1, followers: 2 };
  const indexToTab = ['posts', 'following', 'followers'];
  const selectedIndex = tabToIndex[tabParam] ?? 0;


  const sortedPosts = [...posts].sort((a: PostListItem, b: PostListItem) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();
    return dateB - dateA;
  });

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
            {followees.length === 0 ? (
              <div className="my-profile__card-posts-empty">
                <p className="my-profile__card-posts-empty-title">
                  {isOwn ? 'You are not following anyone' : 'This user is not following anyone'}
                </p>
              </div>
            ) : (
              <UsersList users={followees} />
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
