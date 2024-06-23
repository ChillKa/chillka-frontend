import Pagination, {
  PaginationNext,
  PaginationPrev,
  generatePaginationItems,
} from '@components/Pagination';
import { useState } from 'react';

export type SearchPaginationProps = {
  totalPage?: number;
  initialPage?: number;
  onClickPrev?: (currentPage: number) => void;
  onClickNext?: (currentPage: number) => void;
};

const SearchPagination = ({
  totalPage = 1,
  initialPage = 1,
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
        className="flex justify-between gap-4 px-[8.031rem] py-12"
      >
        <PaginationPrev />
        {generatePaginationItems(currentPage, totalPage)}
        <PaginationNext />
      </div>
    </Pagination>
  );
};

export default SearchPagination;
