import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import EmptyState from '@/components/EmptyState';
import PostsList from '@/components/PostsList';
import UsersList from '@/components/UsersList';
import { PostComment, PostListItem, UserData } from '@/ts/interfaces';

type ProfileTabsProps = {
  selectedIndex: number;
  following: UserData[];
  followers: UserData[];
  posts: PostListItem[];
  isOwn: boolean;
  isFollowed: boolean | undefined;
  onTabSelect: (index: number) => void;
  onRetry: VoidFunction;
  onCommentCreated: (postId: string | number, comment: PostComment) => void;
  onUnfollowFromList: (id: string | number) => Promise<void>;
  onFollowFromList: (id: string | number) => Promise<void>;
};

const ProfileTabs = ({
  selectedIndex,
  following,
  followers,
  posts,
  isOwn,
  isFollowed,
  onTabSelect,
  onRetry,
  onCommentCreated,
  onUnfollowFromList,
  onFollowFromList,
}: ProfileTabsProps) => {
  return (
    <Tabs selectedIndex={selectedIndex} onSelect={onTabSelect}>
      <TabList className="my-profile__card-stats">
        <Tab className="my-profile__card-stats-item" selectedClassName="active">
          <span className="value">{posts.length}</span>
          <span className="label">Posts</span>
        </Tab>

        <Tab className="my-profile__card-stats-item" selectedClassName="active">
          <span className="value">{following.length}</span>
          <span className="label">Following</span>
        </Tab>

        <Tab className="my-profile__card-stats-item" selectedClassName="active">
          <span className="value">{followers.length}</span>
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
              canLike={isFollowed}
              canComment={isFollowed}
              onCommentCreated={onCommentCreated}
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
              onUnfollow={onUnfollowFromList}
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
              onUnfollow={onUnfollowFromList}
              onFollow={onFollowFromList}
            />
          )}
        </TabPanel>
      </section>
    </Tabs>
  );
};

export default ProfileTabs;
