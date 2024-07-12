'use client';

import Pagination, {
  PaginationItem,
  PaginationNext,
  PaginationPrev,
  generatePaginationItems,
} from '@components/Pagination';
import { cva } from 'class-variance-authority';
import { Map } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import AdvancedSearchBarDesktop from './AdvancedSearchBarDesktop';
import AdvancedSearchBarMobile from './AdvancedSearchBarMobile';
import { useSearchProvider } from './SearchProvider';
import { useSearchView } from './SearchViewProvider';
import { SearchParams, updateQueryString } from './fields/utils';

type AdvancedSearchBarProps = {
  totalPage: number;
  currentPage: number;
  children?: React.ReactNode;
};

const paginationStepperStyles = cva('flex gap-4 py-12', {
  variants: {
    isMobile: {
      true: 'justify-center px-[6.46875rem] gap-12',
      false: 'justify-between px-[8.031rem]',
    },
  },
});

const AdvancedSearchBar = ({
  totalPage,
  currentPage,
  children,
}: AdvancedSearchBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [scrollPosition, setScrollPosition] = useState(0);
  const { isMobile, ...formMethods } = useSearchProvider<SearchParams>();
  const { currentShow, setCurrentShow } = useSearchView();

  const handleSearchSubmit = (data: SearchParams) => {
    const queryString = updateQueryString(data);
    router.push(`/search?${queryString}`);
  };

  const handleClearFilter = () => {
    formMethods.reset({
      keyword: '',
      location: '',
      category: '',
      date: '',
      type: '',
      distance: '',
      page: '1',
      sort: '相關性',
      limit: '5',
    });
    const clearedParams = updateQueryString({
      limit: '5',
      page: '1',
    });
    router.push(`/search?${clearedParams}`);
  };

  const toggleCurrentShow = () => {
    if (isMobile) {
      if (currentShow === 'results') {
        setScrollPosition(window.scrollY);
        window.scrollTo(0, 0);
      } else {
        window.scrollTo(0, scrollPosition);
      }
    }
    setCurrentShow((prev) => (prev === 'results' ? 'map' : 'results'));
  };

  const handlePageChange = (newPage: number) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set('page', newPage.toString());
    router.push(`/search?${updatedSearchParams.toString()}`);
  };

  const renderPaginationItems = () => {
    return generatePaginationItems(currentPage, totalPage).map((item) => {
      if (item.type === PaginationItem) {
        return (
          <PaginationItem
            key={item.key}
            page={item.props.page}
            isCurrent={item.props.isCurrent}
            onClick={() => handlePageChange(item.props.page)}
          />
        );
      }
      return item;
    });
  };

  const renderPagination = () => (
    <div id="results-pagination" className="w-full xl:max-w-[53.5rem]">
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onClickPrev={() => handlePageChange(Math.max(currentPage - 1, 1))}
        onClickNext={() =>
          handlePageChange(Math.min(currentPage + 1, totalPage))
        }
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
    </div>
  );

  return (
    <>
      {isMobile ? (
        <section className="fixed bottom-0 left-0 right-0 z-10 flex justify-between gap-2 border-t border-primary bg-surface px-3 py-4">
          <AdvancedSearchBarMobile
            onSearchSubmit={handleSearchSubmit}
            onClearFilter={handleClearFilter}
          />
          <button
            type="button"
            aria-label="Map button"
            className="h-14 w-14 border-[1px] border-primary bg-surface p-4 font-medium text-primary"
            onClick={toggleCurrentShow}
          >
            <Map />
          </button>
        </section>
      ) : (
        <AdvancedSearchBarDesktop
          onSearchSubmit={handleSearchSubmit}
          onClearFilter={handleClearFilter}
        />
      )}

      {children}
      {renderPagination()}
    </>
  );
};

export default AdvancedSearchBar;
