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

export const PaginationPrev = () => {
  const { onClickPrev } = usePagination();
  return (
    <button
      type="button"
      onClick={onClickPrev}
      aria-label="pagination-previous"
      className="flex cursor-pointer items-center justify-center rounded-full p-3"
    >
      <ChevronLeft className="size-4" />
    </button>
  );
};

export const PaginationNext = () => {
  const { onClickNext } = usePagination();

  return (
    <button
      type="button"
      onClick={onClickNext}
      aria-label="pagination-next"
      className="flex cursor-pointer items-center justify-center rounded-full p-3"
    >
      <ChevronRight className="size-4" />
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
};

export const PaginationItem = ({
  page,
  isCurrent = false,
}: PaginationItemProps) => {
  const { currentPage } = usePagination();
  const isActive = isCurrent || currentPage === page;

  return (
    <span
      className={`flex size-10 cursor-pointer items-center justify-center rounded-full ${
        isActive ? 'bg-primary text-white' : 'bg-surface'
      }`}
    >
      {page}
    </span>
  );
};

export const generatePaginationItems = (
  currentPage: number,
  totalPage?: number
) => {
  if (!totalPage) {
    return [
      <PaginationItem key={currentPage - 1} page={currentPage - 1} />,
      <PaginationItem key={currentPage} page={currentPage} isCurrent />,
      <PaginationItem key={currentPage + 1} page={currentPage + 1} />,
    ];
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