import { useState, useEffect } from 'react';
import { Oval } from 'react-loader-spinner';

import Navbar from '@/components/Navbar';
import UserBar from '@/components/UserBar';
import PostsList from '@/components/PostsList';

import { useGetFeedQuery } from '@/services/api';
import { ApiErrorResponse } from '@/ts/types/errors';

import './styles.scss';

const Home = () => {
  const isAuthenticated = Boolean(localStorage.getItem('access-token'));

  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<any[]>([]);

  const { data, isLoading, isFetching, error } = useGetFeedQuery(
    { page },
    { skip: !isAuthenticated }
  );

  useEffect(() => {
    if (data?.posts) {
      setAllPosts((prev) => [...prev, ...data.posts]);
    }
  }, [data]);

  const hasMore = Boolean(data?.pagination?.nextPage);

  const fetchMore = () => {
    if (isFetching || !data?.pagination?.nextPage) return;

    setTimeout(() => {
      setPage(data.pagination.nextPage);
    }, 800);
  };

  const loadedCount = allPosts.length;
  const totalCount = data?.pagination?.totalCount;

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

          {!isLoading && !error && allPosts.length === 0 && (
            <div className="home__layout-postsList-empty">
              No posts yet.
            </div>
          )}

          {!isLoading && !error && allPosts.length > 0 && (
            <PostsList
              items={allPosts}
              fetchMore={fetchMore}
              hasMore={hasMore}
              loadedCount={loadedCount}
              totalCount={totalCount}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
