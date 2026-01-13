import { Oval } from 'react-loader-spinner';

import Navbar from '@/components/Navbar';
import UserBar from '@/components/UserBar';
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

      <div className="home__layout">
        <UserBar className="home__layout-sidebar" />

        <div className="home__layout-posts">
          {isLoading && (
            <div className="home__layout-postsList-loader">
              <Oval
                visible={true}
                height="80"
                width="80"
                color="#0F31AA"
                secondaryColor='#1445D8'
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
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
    </div>
  );
};

export default Home;
