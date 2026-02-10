import { Link } from 'react-router';
import { ThreeDots } from 'react-loader-spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

import Post from '@/components/Post';
import AuthorDetails from '@/components/Post/AuthorDetails';

import type { PostsListProps } from '@/ts/interfaces';

import './styles.scss';

const PostsList = ({ items, fetchMore,
  hasMore, }: PostsListProps) => {

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
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {items.map((post) => (
          <article key={post.id} className="posts__list-item">
            <Link to={`/posts/${post.id}`} state={{ post }} className="posts__list-item-link">
              <AuthorDetails
                name={post.author.name}
                lastName={post.author.lastName}
                email={post.author.email}
                profilePhoto={post.author.profilePhoto}
              />
              <Post post={post} />
            </Link>
          </article>
        ))}
      </InfiniteScroll>
    </div >
  );
};

export default PostsList;
