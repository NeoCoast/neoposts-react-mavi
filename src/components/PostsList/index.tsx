import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Post from '@/components/Post';
import AuthorDetails from '@/components/Post/AuthorDetails';

import type { PostsListProps, PostListItem } from '@/ts/interfaces';

import './styles.scss';

const PostsList = ({ items }: PostsListProps) => {
  const navigate = useNavigate();

  const handlePostClick = useCallback((item: PostListItem) => () => {
    navigate(`/posts/${item.id}`, { state: { post: item } });
  }, [navigate]);

  return (
    <div className="posts__list">
      {items.map((item) => (
        <article
          key={item.id}
          className="posts__list-item"
          role="button"
          tabIndex={0}
          onClick={handlePostClick(item)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handlePostClick(item)();
            }
          }}
        >
          <AuthorDetails
            name={item.author.name}
            lastName={item.author.lastName}
            email={item.author.email}
            profilePhoto={item.author.profilePhoto}
          />
          <Post post={item} />
        </article>
      ))}
    </div>
  );
};

export default PostsList;
