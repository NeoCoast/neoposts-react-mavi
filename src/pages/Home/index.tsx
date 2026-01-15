import { Oval } from 'react-loader-spinner';

import Navbar from '@/components/Navbar';
import UserBar from '@/components/UserBar';
import PostsList from '@/components/PostsList';

import { useGetFeedQuery } from '@/services/api';
import { ApiErrorResponse } from '@/ts/types/errors';

import './styles.scss';

const Home = () => {
  const isAuthenticated = Boolean(localStorage.getItem('access-token'));

  const { data, isLoading, error } = useGetFeedQuery(undefined, {
    skip: !isAuthenticated,
  });

  const posts = data?.posts ?? [];

  return (
    <div className="home">
      <Navbar />

      <div className="home__layout">
        <UserBar className="home__layout-sidebar" />

        <div className="home__layout-posts">
          {isLoading && (
            <div className="home__layout-postsList-loader">
              <Oval
                visible
                height="80"
                width="80"
                color="#0F31AA"
                secondaryColor="#1445D8"
                ariaLabel="oval-loading"
              />
            </div>
          )}

          {!isLoading && error && (
            <div className="home__layout-postsList-error">
              {String(
                (error as ApiErrorResponse)?.data?.message ?? 'Failed to load'
              )}
            </div>
          )}

          {!isLoading && !error && posts.length === 0 && (
            <div className="home__layout-postsList-empty">
              No posts yet.
            </div>
          )}

          {!isLoading && !error && posts.length > 0 && (
            <PostsList items={posts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
