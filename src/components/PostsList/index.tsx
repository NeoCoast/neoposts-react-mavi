import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Post from '@/components/Post';
import AuthorDetails from '@/components/Post/AuthorDetails';

import type { PostsListProps, PostListItem } from '@/ts/interfaces';

import './styles.scss';

const PostsList = ({ posts }: PostsListProps) => {
  const navigate = useNavigate();

  const handlePostClick = useCallback((post: PostListItem) => {
    navigate(`/posts/${post.id}`, { state: { post: post } });
  }, [navigate]);

  return (
    <div className="posts__list">
      {posts.map((post) => (
        <article
          key={post.id}
          className="posts__list-item"
          role="button"
          tabIndex={0}
          onClick={() => handlePostClick(post)}
          onKeyDown={({ key }) => {
            if (key === 'Enter' || key === ' ') {
              handlePostClick(post);
            }
          }}
        >
          <AuthorDetails
            name={post.author.name}
            lastName={post.author.lastName}
            email={post.author.email}
            profilePhoto={post.author.profilePhoto}
          />
          <Post post={post} />
        </article>
      ))}
    </div>
  );
};

export default PostsList;
