import { Link, useLocation } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

import type { PostsListProps } from '@/ts/interfaces';

import Post from '@/components/Post';
import AuthorDetails from '@/components/Post/AuthorDetails';
import Button from '@/components/Button';

import './styles.scss';

const PostsList = ({
  items,
  fetchMore = () => { },
  hasMore,
  loadedCount,
  totalCount,
  pageError,
  onRetry,
  showContent = false,
  canLike = false,
  canComment = false,
  onCommentCreated,
}: PostsListProps) => {
  const { pathname } = useLocation();

  return (
    <div className="posts__list">
      <InfiniteScroll
        className="posts__list-infiniteScroll"
        dataLength={items.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={
          <div className="posts__list-loader">
            <ThreeDots
              height="35"
              width="35"
              radius="8"
              ariaLabel="button-loading"
              color="currentColor"
            />
          </div>
        }
        endMessage={
          <p className="posts__list-infiniteScroll-endMessage">
            Yay! You have seen it all
          </p>
        }
      >
        {items.map((post) => (
          <article key={post.id} className="posts__list-item">
            <Link
              to={`/posts/${post.id}`}
              state={{ post, from: pathname }}
              className="posts__list-item-link"
            >
              <AuthorDetails
                name={post.author?.name}
                email={post.author?.email}
                profilePhoto={post.author?.profilePhoto}
              />

              <Post
                post={post}
                showContent={showContent}
                canLike={canLike}
                canComment={canComment}
                onCommentCreated={(comment) => onCommentCreated?.(post.id, comment)}
              />
            </Link>
          </article>
        ))}
      </InfiniteScroll>

      {pageError && (
        <div className="posts__list-error">
          <p>{pageError}</p>
          <Button
            variant="primary"
            onClick={onRetry}
          >
            Retry
          </Button>
        </div>
      )}

      {typeof totalCount === 'number' && (
        <div className="posts__list-progress">
          {loadedCount} / {totalCount} posts loaded
        </div>
      )}
    </div>
  );
};

export default PostsList;
