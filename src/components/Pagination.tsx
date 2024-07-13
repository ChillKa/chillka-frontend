'use client';

import cn from '@lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { PropsWithChildren, createContext, useContext, useMemo } from 'react';

type PaginationContextProps = {
  totalPage?: number;
  currentPage: number;
  onClickPrev?: () => void;
  onClickNext?: () => void;
};
const PaginationContext = createContext<PaginationContextProps>({
  currentPage: 1,
  onClickPrev: () => {},
  onClickNext: () => {},
});

export const usePagination = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error('usePagination must be used within a Pagination');
  }
  return context;
};

export type PaginationProps = {
  asChild?: boolean;
  currentPage: number;
  onClickNext?: () => void;
  onClickPrev?: () => void;
  totalPage?: number;
};
const Pagination = ({
  asChild,
  children,
  currentPage,
  onClickNext,
  onClickPrev,
  totalPage,
}: PropsWithChildren<PaginationProps>) => {
  const contextValue = useMemo(
    () => ({
      currentPage,
      totalPage,
      onClickNext,
      onClickPrev,
    }),
    [currentPage, onClickNext, onClickPrev, totalPage]
  );

  const Component = asChild ? Slot : 'div';

  return (
    <PaginationContext.Provider value={contextValue}>
      <Component id="pagination-container">{children}</Component>
    </PaginationContext.Provider>
  );
};

type PaginationPrevProps = {
  className?: string;
  iconClassName?: string;
};
export const PaginationPrev = ({
  className,
  iconClassName,
}: PaginationPrevProps) => {
  const { onClickPrev } = usePagination();
  return (
    <button
      type="button"
      onClick={onClickPrev}
      aria-label="pagination-previous"
      className={cn(
        'flex cursor-pointer items-center justify-center rounded-full p-3',
        className
      )}
    >
      <ChevronLeft className={cn('size-4', iconClassName)} />
    </button>
  );
};

type PaginationNextProps = {
  className?: string;
  iconClassName?: string;
};
export const PaginationNext = ({
  className,
  iconClassName,
}: PaginationNextProps) => {
  const { onClickNext } = usePagination();

  return (
    <button
      type="button"
      onClick={onClickNext}
      aria-label="pagination-next"
      className={cn(
        'flex cursor-pointer items-center justify-center rounded-full p-3',
        className
      )}
    >
      <ChevronRight className={cn('size-4', iconClassName)} />
    </button>
  );
};

export const PaginationMore = () => {
  return (
    <span className="flex cursor-default items-center justify-center rounded-full p-3">
      <MoreHorizontal className="size-4" />
    </span>
  );
};

type PaginationItemProps = {
  page: number;
  isCurrent?: boolean;
  onClick?: (page: number) => void;
};

export const PaginationItem = ({
  page,
  isCurrent = false,
  onClick,
}: PaginationItemProps) => {
  const { currentPage } = usePagination();
  const isActive = isCurrent || currentPage === page;

  return (
    <button
      type="button"
      onClick={() => !isCurrent && onClick?.(page)}
      disabled={isCurrent}
      className={cn('flex size-10 items-center justify-center rounded-full', {
        'bg-primary text-white': isActive,
        'bg-surface': !isActive,
        'cursor-default': isCurrent,
        'cursor-pointer hover:bg-primary hover:text-white': !isCurrent,
      })}
    >
      {page}
    </button>
  );
};

export const generatePaginationItems = (
  currentPage: number,
  totalPage: number = 1
) => {
  if (totalPage === 1) {
    return [<PaginationItem key={1} page={1} isCurrent />];
  }

  const items = [];

  if (currentPage > 1) {
    items.push(<PaginationItem key={1} page={1} />);
  }

  if (currentPage > 3) {
    items.push(<PaginationMore key="more-prev" />);
  }

  if (currentPage > 2) {
    items.push(<PaginationItem key={currentPage - 1} page={currentPage - 1} />);
  }

  items.push(<PaginationItem key={currentPage} page={currentPage} isCurrent />);

  if (currentPage < totalPage - 1) {
    items.push(<PaginationItem key={currentPage + 1} page={currentPage + 1} />);
  }

  if (currentPage < totalPage - 2) {
    items.push(<PaginationMore key="more-next" />);
  }

  if (currentPage < totalPage) {
    items.push(<PaginationItem key={totalPage} page={totalPage} />);
  }

  return items;
};

export default Pagination;
