'use client';

import Pagination, {
  PaginationItem,
  PaginationNext,
  PaginationPrev,
  generatePaginationItems,
} from '@components/Pagination';
import { cva } from 'class-variance-authority';
import { useState } from 'react';

export type ResultsPaginationProps = {
  totalPage?: number;
  initialPage?: number;
  isMobile?: boolean;
  onClickPrev?: (currentPage: number) => void;
  onClickNext?: (currentPage: number) => void;
  onPageChange?: (page: number) => void;
};

const paginationStepperStyles = cva('flex gap-4 py-12', {
  variants: {
    isMobile: {
      true: 'justify-center px-[6.46875rem] gap-12',
      false: 'justify-between px-[8.031rem]',
    },
  },
});

const ResultsPagination = ({
  totalPage = 1,
  initialPage = 1,
  isMobile = false,
  onClickPrev,
  onClickNext,
  onPageChange,
}: ResultsPaginationProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePrevClick = () => {
    const newPage = Math.max(currentPage - 1, 1);
    onClickPrev?.(currentPage);
    setCurrentPage(newPage);
    onPageChange?.(newPage);
  };

  const handleNextClick = () => {
    const newPage = Math.min(currentPage + 1, totalPage);
    onClickNext?.(currentPage);
    setCurrentPage(newPage);
    onPageChange?.(newPage);
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    onPageChange?.(page);
  };

  const renderPaginationItems = () => {
    return generatePaginationItems(currentPage, totalPage).map((item) => {
      if (item.type === PaginationItem) {
        return (
          <PaginationItem
            key={item.key}
            page={item.props.page}
            isCurrent={item.props.isCurrent}
            onClick={() => handlePageClick(item.props.page)}
          />
        );
      }
      return item;
    });
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
        {isMobile ? null : renderPaginationItems()}
        <PaginationNext
          className={isMobile ? 'border-[1px]' : ''}
          iconClassName={isMobile ? 'size-12' : ''}
        />
      </div>
    </Pagination>
  );
};

export default ResultsPagination;
