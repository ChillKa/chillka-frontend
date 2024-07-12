'use client';

import Pagination, {
  PaginationItem,
  PaginationNext,
  PaginationPrev,
  generatePaginationItems,
} from '@components/Pagination';
import { cva } from 'class-variance-authority';

export type ResultsPaginationProps = {
  totalPage: number;
  currentPage: number;
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
  totalPage,
  currentPage,
  isMobile = false,
  onClickPrev,
  onClickNext,
  onPageChange,
}: ResultsPaginationProps) => {
  const handlePrevClick = () => {
    onClickPrev?.(currentPage);
  };

  const handleNextClick = () => {
    onClickNext?.(currentPage);
  };

  const renderPaginationItems = () => {
    return generatePaginationItems(currentPage, totalPage).map((item) => {
      if (item.type === PaginationItem) {
        return (
          <PaginationItem
            key={item.key}
            page={item.props.page}
            isCurrent={item.props.isCurrent}
            onClick={() => onPageChange?.(item.props.page)}
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
