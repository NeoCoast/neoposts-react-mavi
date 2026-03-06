import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';

import { PostComment, PostListItem, UserData } from '@/ts/interfaces';
import useFollowHandlers from '@/utils/useFollowHandlers';

import ProfileHeader from '@/components/ProfileInfo/ProfileHeader';
import ProfileTabs from '@/components/ProfileInfo/ProfileTabs';

import './styles.scss';

type MyProfileInfoProps = {
  name: string;
  email: string;
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
  const {
    isFollowedState,
    handleButtonClick,
    handleUnfollowFromList,
    handleFollowFromList,
  } = useFollowHandlers({
    userId,
    followed,
    isFetching,
  });

  const tabParam = searchParams.get('tab') ?? 'posts';
  const tabToIndex: Record<string, number> = { posts: 0, following: 1, followers: 2 };
  const indexToTab = ['posts', 'following', 'followers'];
  const selectedIndex = tabToIndex[tabParam] ?? 0;

  const [postsState, setPostsState] = useState<PostListItem[]>(posts);

  useEffect(() => {
    setPostsState(posts);
  }, [posts]);

  const handleOnCommentCreated = (postId: string | number, comment: PostComment) => {
    setPostsState((prev) => prev.map((post) => String(post.id) === String(postId) ? { ...post, comments: (post.comments ?? []).concat(comment) } : post));
  };

  return (
    <article className="my-profile__card">
      <ProfileHeader
        name={name}
        email={email}
        isOwn={isOwn}
        isFollowed={isFollowedState}
        onBack={onBack}
        onFollowToggle={handleButtonClick}
      />

      <ProfileTabs
        selectedIndex={selectedIndex}
        onTabSelect={(index: number) => {
          const tab = indexToTab[index] ?? 'posts';

          setSearchParams({ tab });
        }}
        posts={postsState}
        following={following}
        followers={followers}
        isOwn={isOwn}
        isFollowed={isFollowedState}
        onRetry={onRetry}
        onCommentCreated={handleOnCommentCreated}
        onUnfollowFromList={handleUnfollowFromList}
        onFollowFromList={handleFollowFromList}
      />
    </article>
  );
};

export default ProfileInfo;
