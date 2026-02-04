import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Button from '@/components/Button';
import { PaginationProps } from '@/ts/interfaces';

import './styles.scss';

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, className, setPage }) => {

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className={['pagination', className].filter(Boolean).join(' ')}>
      <Button
        className="pagination__btn"
        onClick={handlePrevPage}
        disabled={page <= 1}
        title={<IoIosArrowBack />}
      />
      <span className="pagination__info">
        Page {page} of {totalPages}
      </span>

      <Button
        className="pagination__btn"
        onClick={handleNextPage}
        disabled={page >= totalPages}
        title={<IoIosArrowForward />}
      />
    </div>
  );
};

export default Pagination;
