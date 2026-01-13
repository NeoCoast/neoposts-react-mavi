import { IoIosArrowBack, IoIosHeartEmpty } from 'react-icons/io';
import { BiSolidComment } from 'react-icons/bi';

import PostContent from '@/components/PostContent';
import { PostComment, PostListItem } from '@/ts/interfaces';
import {
  formatAuthorName,
  formatMention,
  formatRelativeDate,
  getFullName,
} from '@/utils/postUtils';

import userProfilePlaceholder from '@/assets/Icons/userProfilePhoto.svg';

import './styles.scss';

type PostDetailCardProps = {
  post: PostListItem;
  postContent: string;
  likesCount: number;
  comments: PostComment[];
  commentsCount: number;
  publishedAt: string;
  onBack: () => void;
};

function PostDetailCard({
  post,
  postContent,
  likesCount,
  comments,
  commentsCount,
  publishedAt,
  onBack,
}: PostDetailCardProps) {
  const authorFullName = getFullName(post.author.name, post.author.lastName);
  const authorAlt = authorFullName || 'Author avatar';
  const authorEmail = post.author.email ?? 'email unavailable';
  const authorDisplayName = authorFullName || 'Unknown Author';

  return (
    <article className="post__detail-card">
      <button type="button" className="post__detail-card-back" onClick={onBack}>
        <IoIosArrowBack />
        <span>Back</span>
      </button>

      <header className="post__detail-card-header">
        <img
          className="post__detail-card-header-avatar"
          src={post.author.profilePhoto || userProfilePlaceholder}
          alt={authorAlt}
        />

        <div className="post__detail-card-header-author">
          <h2 className="post__detail-card-header-author-name">{authorDisplayName}</h2>
          <p className="post__detail-card-header-author-email">{authorEmail}</p>
        </div>
      </header>

      <h1 className="post__detail-card-title">{post.title}</h1>
      <PostContent content={postContent} />

      <div className="post__detail-card-meta">
        <time className="post__detail-card-meta-date" dateTime={post.publishedAt}>
          {publishedAt}
        </time>

        <button type="button" className="post__detail-card-meta-like">
          <IoIosHeartEmpty />
          <span>{likesCount}</span>
        </button>
      </div>

      <span className="post__detail-card-separator" />

      <section className="post__detail-comments">
        <div className="post__detail-comments-header">
          <BiSolidComment />
          <span>{commentsCount} comments</span>
        </div>

        <div className="post__detail-comments-list">
          {comments.length === 0 ? (
            <p className="post__detail-comments-list-empty">No comments yet.</p>
          ) : (
            comments.map((comment) => {
              const commentFullName = getFullName(comment.author.name, comment.author.lastName);
              const commentAlt = commentFullName || 'Comment author';
              const mention = formatMention(comment.author);

              return (
                <article key={comment.id} className="post__detail-list-comment">
                  <img
                    className="post__detail-list-comment-avatar"
                    src={comment.author.profilePhoto || userProfilePlaceholder}
                    alt={commentAlt}
                  />
                  <div className="post__detail-list-comment-body">
                    <div className="post__detail-list-comment-header">
                      <span className="post__detail-list-comment-name">
                        {formatAuthorName(comment.author)}
                      </span>
                      {mention && (
                        <span className="post__detail-list-comment-mention">@{mention}</span>
                      )}
                      {comment.publishedAt && (
                        <time
                          className="post__detail-list-comment-date"
                          dateTime={comment.publishedAt}
                        >
                          {formatRelativeDate(comment.publishedAt)}
                        </time>
                      )}
                    </div>
                    <p className="post__detail-list-comment-content">{comment.content}</p>
                    <div className="post__detail-list-comment-actions">
                      <button type="button" className="post__detail-list-comment-actions-like">
                        <IoIosHeartEmpty />
                        <span>{comment.likesCount}</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>
    </article>
  );
}

export { PostDetailCard };
export default PostDetailCard;
