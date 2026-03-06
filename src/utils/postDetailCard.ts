import userProfilePlaceholder from '@/assets/Icons/userProfilePhoto.svg';
import { ROUTES } from '@/constants/routes';
import { PostListItem, UserData } from '@/ts/interfaces';
import { getFullName } from '@/utils/postUtils';

type BuildPostDetailMetaInput = {
  post: PostListItem;
  me?: UserData;
};

export const buildPostDetailMeta = ({ post, me }: BuildPostDetailMetaInput) => {
  const isOwnPost = Boolean(me && String(me.id) === String(post.author.id));
  const isFollowing = post.author.followed ?? false;
  const canComment = Boolean(isFollowing);
  const canLike = isOwnPost || isFollowing;

  const authorFullName = getFullName(post.author.name);
  const authorAlt = authorFullName || 'Author avatar';
  const authorEmail = post.author.email ?? 'email unavailable';
  const authorDisplayName = authorFullName || 'Unknown Author';
  const authorRoute = `${ROUTES.USERS}/${post.author.id}`;
  const destination = isOwnPost ? ROUTES.MY_PROFILE : authorRoute;

  const comments = post.comments ?? [];
  const commentsCount = post.comments?.length ?? post.commentsCount ?? 0;
  const likesCount = post.likesCount ?? 0;
  const body = post.body ?? '';
  const avatarSrc = post.author.profilePhoto || userProfilePlaceholder;

  return {
    body,
    canComment,
    canLike,
    comments,
    commentsCount,
    likesCount,
    destination,
    authorAlt,
    authorEmail,
    authorDisplayName,
    avatarSrc,
  };
};
