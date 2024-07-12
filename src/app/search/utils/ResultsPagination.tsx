'use client';

import Pagination, {
  PaginationItem,
  PaginationNext,
  PaginationPrev,
  generatePaginationItems,
} from '@components/Pagination';
import { updateQueryString } from '@components/search/SearchBar';
import { useSearchProvider } from '@components/search/SearchBar/SearchProvider';
import { cva } from 'class-variance-authority';
import Link from 'next/link';

export type ResultsPaginationProps = {
  totalPage: number;
  currentPage: number;
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
}: ResultsPaginationProps) => {
  const { isMobile } = useSearchProvider();
  const handlePageChange = (newPage: number) => {
    const updatedQuery = updateQueryString({
      page: newPage.toString(),
    });
    return `/search?${updatedQuery}`;
  };

  const renderPaginationItems = () => {
    return generatePaginationItems(currentPage, totalPage).map((item) => {
      if (item.type === PaginationItem) {
        return (
          <Link
            key={item.key}
            href={handlePageChange(item.props.page)}
            passHref
          >
            <PaginationItem
              page={item.props.page}
              isCurrent={item.props.isCurrent}
            />
          </Link>
        );
      }
      return item;
    });
  };

  return (
    <Pagination currentPage={currentPage} totalPage={totalPage} asChild>
      <div
        id="pagination-stepper"
        className={paginationStepperStyles({ isMobile })}
      >
        <Link href={handlePageChange(Math.max(currentPage - 1, 1))} passHref>
          <PaginationPrev
            className={isMobile ? 'border-[1px]' : ''}
            iconClassName={isMobile ? 'size-12' : ''}
          />
        </Link>
        {isMobile ? null : renderPaginationItems()}
        <Link
          href={handlePageChange(Math.min(currentPage + 1, totalPage))}
          passHref
        >
          <PaginationNext
            className={isMobile ? 'border-[1px]' : ''}
            iconClassName={isMobile ? 'size-12' : ''}
          />
        </Link>
      </div>
    </Pagination>
  );
};

export default ResultsPagination;
