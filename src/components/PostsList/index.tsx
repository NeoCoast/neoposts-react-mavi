import Post from '@/components/Post';
import AuthorDetails from '@/components/Post/AuthorDetails';
import type { PostsListProps } from '@/ts/interfaces';

import './styles.scss';

const PostsList = ({ items }: PostsListProps) => (
  <div className="posts__list">
    {items.map(({ id, title, content, publishedAt, author }) => (
      <div key={id} className="posts__list-item">
        <AuthorDetails
          name={author.name}
          lastName={author.lastName}
          email={author.email}
          profilePhoto={author.profilePhoto}
        />
        <Post post={{ id, title, content, publishedAt }} />
      </div>
    ))}
  </div>
);

export default PostsList;
