import Navbar from '@/components/Navbar';
import UserBar from '@/components/UserBar';
import Toaster from '@/components/Toaster';
import PostsList from '@/components/PostsList';

import { useGetFeedQuery, useGetPostsQuery } from '@/services/api';
import { ApiErrorResponse } from '@/ts/types/errors';

import './styles.scss';

const Home = () => {
  const isAuthenticated = Boolean(localStorage.getItem('access-token'));

  const feedQuery = useGetFeedQuery(undefined, { skip: !isAuthenticated, });

  const postsQuery = useGetPostsQuery(undefined, { skip: isAuthenticated, });

  const data = isAuthenticated ? feedQuery.data?.posts : postsQuery.data?.posts;

  const isLoading = feedQuery.isLoading || postsQuery.isLoading;
  const error = feedQuery.error || postsQuery.error;

  return (
    <div className="home">
      <Navbar />
      <Toaster position="top-center" />

      <UserBar className="home__layout-sidebar" />

      <div className="home__layout-posts">
        {isLoading && (
          <div className="home__layout-postsList-loader">Loading posts…</div>
        )}

        {!isLoading && error && (
          <div className="home__layout-postsList-error">
            {String((error as ApiErrorResponse)?.data?.message ?? 'Failed to load')}
          </div>
        )}

        {!isLoading && !error && data.length === 0 && (
          <div className="home__layout-postsList-empty">No posts yet.</div>
        )}

        {!isLoading && !error && data.length > 0 && (
          <PostsList items={data} />
        )}
      </div>
    </div>
  );
};

export default Home;
