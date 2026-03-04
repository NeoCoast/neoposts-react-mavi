import { useCallback, useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { useGetPostQuery } from '@/services/api';

import Button from '@/components/Button';
import PostDetailCard from '@/components/PostDetailCard';

import { PostDetailLocationState, PostDetailRouteParams } from '@/ts/interfaces';

import './styles.scss';

function PostDetail() {
  const navigate = useNavigate();
  const { id } = useParams<PostDetailRouteParams>();
  const location = useLocation();

  const parsedId = Number(id);
  const isValidId = Number.isInteger(parsedId) && parsedId > 0;
  const shouldSkip = !isValidId;

  useEffect(() => {
    if (shouldSkip) navigate(ROUTES.HOME);
  }, [shouldSkip, navigate]);

  const {
    data: post,
    isLoading,
    error,
  } = useGetPostQuery(parsedId, { skip: shouldSkip });

  const handleBack = useCallback(() => {
    const from = (location.state as PostDetailLocationState)?.from;

    if (from) {
      navigate(-1);
      return;
    }

    navigate(ROUTES.HOME);
  }, [navigate, location.state]);

  const handleGoHome = useCallback(() => {
    navigate(ROUTES.HOME);
  }, [navigate]);

  const renderMainContent = () => {
    if (isLoading) {
      return (
        <div className="post__detail-loader">
          <Oval
            visible
            height="72"
            width="72"
            color="#0F31AA"
            secondaryColor="#1445D8"
            ariaLabel="loading-post"
          />
        </div>
      );
    }

    if (!!error) {
      return (
        <div className="post__detail-error">
          <p>We couldn&apos;t load this post. Please try again later.</p>
          <Button
            className="post__detail-empty-home"
            onClick={handleGoHome}
          >
            Go Home
          </Button>
        </div>
      );
    }

    if (!post) {
      return (
        <div className="post__detail-empty">
          <p>The requested post does not exist.</p>
          <Button
            className="post__detail-empty-home"
            onClick={handleGoHome}
          />
        </div>
      );
    }

    return (
      <PostDetailCard
        post={post}
        onBack={handleBack}
      />
    );
  };

  return (
    <div className="post__detail">
      <div className="post__detail-layout-sidebar-content">
        {renderMainContent()}
      </div>
    </div>
  );
}

export default PostDetail;
