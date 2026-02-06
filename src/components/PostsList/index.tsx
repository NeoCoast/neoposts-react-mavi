import { Link } from 'react-router';

import Post from '@/components/Post';
import AuthorDetails from '@/components/Post/AuthorDetails';

import type { PostsListProps, PostListItem } from '@/ts/interfaces';

import './styles.scss';

const PostsList = ({ items }: PostsListProps) => {

  return (
    <div className="posts__list">
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
    </div>
  );
};

export default PostsList;
