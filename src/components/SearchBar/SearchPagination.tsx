'use client';

import Pagination, {
  PaginationNext,
  PaginationPrev,
  generatePaginationItems,
} from '@components/Pagination';
import { cva } from 'class-variance-authority';
import { useState } from 'react';

export type SearchPaginationProps = {
  totalPage?: number;
  initialPage?: number;
  isMobile?: boolean;
  onClickPrev?: (currentPage: number) => void;
  onClickNext?: (currentPage: number) => void;
};

const paginationStepperStyles = cva('flex gap-4 py-12', {
  variants: {
    isMobile: {
      true: 'justify-center px-[6.46875rem] gap-12 debug',
      false: 'justify-between px-[8.031rem]',
    },
  },
});

const SearchPagination = ({
  totalPage = 1,
  initialPage = 1,
  isMobile = false,
  onClickPrev,
  onClickNext,
}: SearchPaginationProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePrevClick = () => {
    onClickPrev?.(currentPage);
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextClick = () => {
    onClickNext?.(currentPage);
    setCurrentPage((prev) => Math.min(prev + 1, totalPage));
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPage={totalPage}
      onClickPrev={handlePrevClick}
      onClickNext={handleNextClick}
      asChild
    >
      <div
        id="pagination-stepper"
        className={paginationStepperStyles({ isMobile })}
      >
        <PaginationPrev
          className={isMobile ? 'border-[1px]' : ''}
          iconClassName={isMobile ? 'size-12' : ''}
        />
        {isMobile ? null : generatePaginationItems(currentPage, totalPage)}
        <PaginationNext
          className={isMobile ? 'border-[1px]' : ''}
          iconClassName={isMobile ? 'size-12' : ''}
        />
      </div>
    </Pagination>
  );
};

export default SearchPagination;
