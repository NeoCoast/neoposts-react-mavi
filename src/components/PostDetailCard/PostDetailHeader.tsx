import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

import Button from '@/components/Button';

type PostDetailHeaderProps = {
  destination: string;
  avatarSrc: string;
  authorAlt: string;
  authorDisplayName: string;
  authorEmail: string;
  onBack: () => void;
};

const PostDetailHeader = ({
  destination,
  avatarSrc,
  authorAlt,
  authorDisplayName,
  authorEmail,
  onBack,
}: PostDetailHeaderProps) => {
  return (
    <>
      <Button
        variant="icon"
        className="post__detail-card-back"
        aria-label="Back"
        onClick={onBack}
      >
        <IoIosArrowBack />
        Back
      </Button>

      <header className="post__detail-card-header">
        <Link to={destination} state={{ from: 'post' }} className="post__detail-card-header-link">
          <img
            className="post__detail-card-header-avatar"
            src={avatarSrc}
            alt={authorAlt}
          />
          <div className="post__detail-card-header-author">
            <h2 className="post__detail-card-header-author-name">{authorDisplayName}</h2>
            <p className="post__detail-card-header-author-email">{authorEmail}</p>
          </div>
        </Link>
      </header>
    </>
  );
};

export default PostDetailHeader;
