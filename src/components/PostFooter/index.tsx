import { IoIosHeartEmpty } from "react-icons/io";
import { BiSolidComment } from "react-icons/bi";

import type { PostFooterProps } from '@/ts/interfaces';

import Button from '@/components/Button';

import './styles.scss';

const PostFooter = ({ publishedAt }: PostFooterProps) => {
  const formattedDate = new Date(publishedAt).toLocaleString();
  return (
    <footer className="post__footer">
      <time className="post__footer-date" dateTime={publishedAt}>{formattedDate}</time>
      <div className="post__footer-icons">
        <Button variant="post__footer-icons-heart" title={<IoIosHeartEmpty />} />
        <Button variant="post__footer-icons-comment" title={<BiSolidComment />} />
      </div>
    </footer>
  );
};

export default PostFooter;
