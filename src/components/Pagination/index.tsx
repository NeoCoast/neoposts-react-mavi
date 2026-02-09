import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

import Button from '@/components/Button';

import './styles.scss';

type PaginationProps = {
  page: number;
  totalPages: number;
  className?: string;
};

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, className }) => {
  const prevPage = page > 1 ? `?page=${page - 1}` : '';
  const nextPage = page < totalPages ? `?page=${page + 1}` : '';

  return (
    <div className={['pagination', className].filter(Boolean).join(' ')}>

      <Link to={prevPage} aria-disabled={page <= 1}>
        <Button
          className="pagination__btn"
          disabled={page <= 1}
          title={<IoIosArrowBack />}
        />
      </Link>

      <span className="pagination__info">
        Page {page} of {totalPages}
      </span>

      <Link to={nextPage} aria-disabled={page >= totalPages}>
        <Button
          className="pagination__btn"
          disabled={page >= totalPages}
          title={<IoIosArrowForward />}
        />
      </Link>
    </div>
  );
};

export default Pagination;
