import { useCallback } from 'react';
import { Oval } from 'react-loader-spinner';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';

import Navbar from '@/components/Navbar';
import UserBar from '@/components/UserBar';
import Button from '@/components/Button';
import PostDetailCard from '@/components/PostDetailCard';

import { PostDetailLocationState, PostDetailRouteParams } from '@/ts/interfaces';

import { usePostDetailData } from '@/hooks/usePostDetailData';

import './styles.scss';

function PostDetail() {
  const navigate = useNavigate();
  const { id = '' } = useParams<PostDetailRouteParams>();
  const location = useLocation();
  const locationState = location.state as PostDetailLocationState | null;

  const postFromState = locationState?.post;

  const {
    post,
    content: postContent,
    likesCount,
    comments,
    commentsCount,
    publishedAtRaw,
    publishedAt,
    isLoading,
    hasError,
  } = usePostDetailData({ id, postFromState });

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
        <div className="post__detail-loader">
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
        <div className="post__detail-error">
          We couldn&apos;t load this post. Please try again later.
        </div>
      );
    }

    if (!post) {
      return (
        <div className="post__detail-empty">
          <p>The requested post does not exist.</p>
          <Button
            className="post__detail-empty-home"
            title="Go to home"
            onClick={handleGoHome}
          />
        </div>
      );
    }

    return (
      <PostDetailCard
        post={post}
        postContent={postContent}
        likesCount={likesCount}
        comments={comments}
        commentsCount={commentsCount}
        publishedAtRaw={publishedAtRaw}
        publishedAtLabel={publishedAt}
        onBack={handleBack}
      />
    );
  };

  return (
    <div className="post__detail">
      <Navbar />

      <div className="post__detail-layout">
        <UserBar className="post__detail-layout-sidebar" />
        <div className="post__detail-layout-sidebar-content">{renderMainContent()}</div>
      </div>
    </div>
  );
}

export { PostDetail };
export default PostDetail;
