import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

import Button from '@/components/Button';

import './styles.scss';

type PaginationProps = {
  page: number;
  totalPages: number;
  className?: string;
  searchQuery?: string;
};

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, className, searchQuery }) => {
  const buildQuery = (targetPage: number) => {
    const params = new URLSearchParams({ page: `${targetPage}` });

    if (searchQuery) {
      params.set('search', searchQuery);
    }

    return `?${params.toString()}`;
  };

  const prevPage = page > 1 ? buildQuery(page - 1) : '';
  const nextPage = page < totalPages ? buildQuery(page + 1) : '';

  return (
    <div className={['pagination', className].filter(Boolean).join(' ')}>

      {page > 1 ? (
        <Link to={prevPage}>
          <Button
            className="pagination__btn"
          >
            <IoIosArrowBack />
          </Button>
        </Link>
      ) : (
        <Button
          className="pagination__btn"
          disabled
        >
          <IoIosArrowBack />
        </Button>
      )}

      <span className="pagination__info">
        Page {page} of {totalPages}
      </span>

      {page < totalPages ? (
        <Link to={nextPage}>
          <Button
            className="pagination__btn"
          >
            <IoIosArrowForward />
          </Button>
        </Link>
      ) : (
        <Button
          className="pagination__btn"
          disabled
        >
          <IoIosArrowForward />
        </Button>
      )}

    </div>
  );
};

export default Pagination;
