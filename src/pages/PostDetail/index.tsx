import { useCallback, useMemo } from 'react';
import { Oval } from 'react-loader-spinner';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack, IoIosHeartEmpty } from 'react-icons/io';
import { BiSolidComment } from 'react-icons/bi';

import Navbar from '@/components/Navbar';
import UserBar from '@/components/UserBar';
import PostContent from '@/components/PostContent';
import { useGetPostsQuery } from '@/services/api';
import { ROUTES } from '@/constants/routes';

import { PostComment, PostListItem, PostDetailLocationState, PostDetailRouteParams } from '@/ts/interfaces';

import userProfilePlaceholder from '@/assets/Icons/userProfilePhoto.svg';

import './styles.scss';

function PostDetail() {
  const navigate = useNavigate();
  const { id = '' } = useParams<PostDetailRouteParams>();
  const location = useLocation();
  const locationState = location.state as PostDetailLocationState | null;

  const postFromState = locationState?.post;
  const shouldSkipQuery = Boolean(postFromState);

  const {
    data: postsData,
    isLoading: queryLoading,
    error: queryError,
  } = useGetPostsQuery(undefined, { skip: shouldSkipQuery });

  const post = useMemo(() => {
    if (postFromState) return postFromState;

    const list = extractPosts(postsData);
    return list.find((item) => String(item.id) === String(id));
  }, [id, postFromState, postsData]);

  const {
    content: postContent,
    likesCount,
    comments,
    commentsCount,
    publishedAt,
  } = useMemo(() => {
    if (!post) {
      return {
        content: '',
        likesCount: 0,
        comments: [] as PostComment[],
        commentsCount: 0,
        publishedAt: '',
      };
    }

    const normalizedComments = getComments(post);

    return {
      content: getPostContent(post),
      likesCount: getLikesCount(post),
      comments: normalizedComments,
      commentsCount: getCommentsCount(post, normalizedComments),
      publishedAt: formatDate(post.publishedAt),
    };
  }, [post]);

  const isLoading = queryLoading && !postFromState;
  const hasError = Boolean(queryError) && !postFromState;

  const handleBack = useCallback(() => {
    if (window.history.state && window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate(ROUTES.HOME);
  }, [navigate]);

  const handleGoHome = useCallback(() => {
    navigate(ROUTES.HOME);
  }, [navigate]);

  const renderMainContent = () => {
    if (isLoading) {
      return (
        <div className="post-detail__loader">
          <Oval
            visible={true}
            height="72"
            width="72"
            color="#0F31AA"
            secondaryColor="#1445D8"
            ariaLabel="loading-post"
          />
        </div>
      );
    }

    if (hasError) {
      return (
        <div className="post-detail__error">
          We couldn&apos;t load this post. Please try again later.
        </div>
      );
    }

    if (!post) {
      return (
        <div className="post-detail__empty">
          <p>The requested post does not exist.</p>
          <button type="button" className="post-detail__home" onClick={handleGoHome}>
            Go to home
          </button>
        </div>
      );
    }

    const authorFullName = getFullName(post.author.name, post.author.lastName);
    const authorAlt = authorFullName || 'Author avatar';
    const authorEmail = post.author.email ?? 'email unavailable';
    const authorDisplayName = authorFullName || 'Unknown Author';

    return (
      <article className="post__detail-card">
        <button type="button" className="post__detail-card-back" onClick={handleBack}>
          <IoIosArrowBack />
          <span>Back</span>
        </button>

        <header className="post__detail-card-header">
          <img
            className="post__detail-card-header-avatar"
            src={post.author.profilePhoto || userProfilePlaceholder}
            alt={authorAlt}
          />

          <div className="post__detail-card-header-author">
            <h2 className="post__detail-card-header-author-name">{authorDisplayName}</h2>
            <p className="post__detail-card-header-author-email">{authorEmail}</p>
          </div>
        </header>

        <h1 className="post__detail-card-title">{post.title}</h1>
        <PostContent content={postContent} />

        <div className="post__detail-card-meta">
          <time className="post__detail-card-meta-date" dateTime={post.publishedAt}>
            {publishedAt}
          </time>

          <button type="button" className="post__detail-card-meta-like">
            <IoIosHeartEmpty />
            <span>{likesCount}</span>
          </button>
        </div>

        <span className="post__detail-card-separator" />

        <section className="post__detail-comments">
          <div className="post__detail-comments-header">
            <BiSolidComment />
            <span>{commentsCount} comments</span>
          </div>

          <div className="post__detail-comments-list">
            {comments.length === 0 ? (
              <p className="post__detail-comments-list-empty">No comments yet.</p>
            ) : (
              comments.map((comment) => {
                const commentFullName = getFullName(comment.author.name, comment.author.lastName);
                const commentAlt = commentFullName || 'Comment author';
                const mention = formatMention(comment.author);

                return (
                  <article key={comment.id} className="post__detail-list-comment">
                    <img
                      className="post__detail-list-comment-avatar"
                      src={comment.author.profilePhoto || userProfilePlaceholder}
                      alt={commentAlt}
                    />
                    <div className="post__detail-list-comment-body">
                      <div className="post__detail-list-comment-header">
                        <span className="post__detail-list-comment-name">
                          {formatAuthorName(comment.author)}
                        </span>
                        {mention && (
                          <span className="post__detail-list-comment-mention">@{mention}</span>
                        )}
                        {comment.publishedAt && (
                          <time className="post__detail-list-comment-date" dateTime={comment.publishedAt}>
                            {formatRelativeDate(comment.publishedAt)}
                          </time>
                        )}
                      </div>
                      <p className="post__detail-list-comment-content">{comment.content}</p>
                      <div className="post__detail-list-comment-actions">
                        <button type="button" className="post__detail-list-comment-actions-like">
                          <IoIosHeartEmpty />
                          <span>{comment.likesCount}</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>
      </article>
    );
  };

  return (
    <div className="post__detail">
      <Navbar />

      <div className="post__detail-layout">
        <UserBar className="post__detail-sidebar" />
        <div className="post__detail-sidebar-content">{renderMainContent()}</div>
      </div>
    </div>
  );
}

const getLikesCount = (post: PostListItem): number => {
  if (typeof post.likesCount === 'number') return post.likesCount;

  const raw = post as unknown as { likes_count?: number; likes?: unknown[] };
  if (typeof raw.likes_count === 'number') return raw.likes_count;
  if (Array.isArray(raw.likes)) return raw.likes.length;
  return 0;
};

const getComments = (post: PostListItem): PostComment[] => {
  if (Array.isArray(post.comments)) return post.comments;

  const raw = post as unknown as { comments?: any[] };
  if (!Array.isArray(raw.comments)) return [];

  return raw.comments.map((comment) => mapComment(comment));
};

const extractPosts = (data: unknown): PostListItem[] => {
  if (!data || typeof data !== 'object') return [];

  const posts = (data as { posts?: PostListItem[] }).posts;
  return Array.isArray(posts) ? posts : [];
};

const getCommentsCount = (post: PostListItem, comments: PostComment[]): number => {
  if (typeof post.commentsCount === 'number') return post.commentsCount;

  const raw = post as unknown as { comments_count?: number };
  if (typeof raw.comments_count === 'number') return raw.comments_count;

  return comments.length;
};

const getPostContent = (post: PostListItem): string => {
  if (typeof post.content === 'string' && post.content.trim()) return post.content;

  const raw = post as unknown as {
    body?: unknown;
    description?: unknown;
    text?: unknown;
    attributes?: {
      content?: unknown;
      body?: unknown;
      text?: unknown;
      description?: unknown;
    };
    content_text?: unknown;
    content_html?: unknown;
  };

  const candidates = [
    raw.body,
    raw.description,
    raw.text,
    raw.content_text,
    raw.content_html,
    raw.attributes?.content,
    raw.attributes?.body,
    raw.attributes?.text,
    raw.attributes?.description,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim()) return candidate;
    if (Array.isArray(candidate)) {
      const flattened = candidate.filter((item) => typeof item === 'string').join('\n').trim();
      if (flattened) return flattened;
    }
  }

  return '';
};

const mapComment = (comment: any): PostComment => {
  const author = comment?.author ?? comment?.user ?? {};
  const likes = comment?.likes;
  const likesCount =
    typeof comment?.likesCount === 'number'
      ? comment.likesCount
      : typeof comment?.likes_count === 'number'
        ? comment.likes_count
        : Array.isArray(likes)
          ? likes.length
          : 0;

  const generatedId =
    comment?.id ??
    globalThis.crypto?.randomUUID?.() ??
    Math.random().toString(36).slice(2);

  return {
    id: generatedId,
    content: String(comment?.content ?? ''),
    publishedAt: comment?.publishedAt ?? comment?.created_at ?? comment?.createdAt,
    likesCount,
    author: {
      name: author?.name ?? author?.first_name ?? author?.username ?? '',
      lastName: author?.lastName ?? author?.last_name ?? '',
      email: author?.email,
      profilePhoto: author?.profilePhoto ?? author?.profile_photo ?? author?.avatar ?? author?.image,
      username: author?.username,
    },
  } as PostComment;
};

const formatDate = (value?: string) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

const formatRelativeDate = (value?: string) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });
};

const formatAuthorName = (author: PostComment['author']): string => {
  const base = [author.name, author.lastName].filter(Boolean).join(' ').trim();
  if (base) return base;
  if (author.username) return author.username;
  if (author.email) return author.email.split('@')[0];
  return 'Unknown';
};

const formatMention = (author: PostComment['author']): string | null => {
  if (author.username) return author.username;
  if (author.email) return author.email.split('@')[0];
  return null;
};

const getFullName = (name?: string | null, lastName?: string | null): string => {
  return [name, lastName].filter(Boolean).join(' ').trim();
};

export { PostDetail };
export default PostDetail;
