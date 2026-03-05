import { useEffect, useState } from 'react';

import { useFollowUserMutation, useUnfollowUserMutation } from '@/services/api';

import { notify } from '@/components/Toaster/notify';

type UseFollowHandlersProps = {
  userId?: string | number;
  followed?: boolean;
  isFetching?: boolean;
};

const useFollowHandlers = ({ userId, followed, isFetching }: UseFollowHandlersProps) => {
  const [followUser, { isLoading: isFollowingLoading }] = useFollowUserMutation();
  const [unfollowUser, { isLoading: isUnfollowingLoading }] = useUnfollowUserMutation();
  const [isFollowedState, setIsFollowedState] = useState(followed);

  const isLoadingFollowingMutation = isFollowingLoading || isUnfollowingLoading;

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

  return {
    isFollowedState,
    handleButtonClick,
    handleUnfollowFromList,
    handleFollowFromList,
  } as const;
};

export default useFollowHandlers;
