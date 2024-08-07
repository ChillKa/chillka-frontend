'use client';

import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { Popover, PopoverTrigger } from '@components/ui/popover';
import { H2 } from '@components/ui/typography';
import useDimensions from '@hooks/use-dimensions';
import cn from '@lib/utils';
import { HashIcon, MapIcon, SearchIcon, XIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { SearchField, useSearchProvider } from './SearchProvider';
import { ActivityMobileField } from './fields/ActivityField';
import { Category, CategoryMobileFieldMenu } from './fields/CategoryFieldMenu';
import { Location, LocationMobileFieldMenu } from './fields/LocationFieldMenu';
import { useKeywordSearch } from './fields/use-keyword-search';

type SearchBarMobileProps = {
  className: string;
  locations: Location[];
  categories: Category[];
  onSearchSubmit?: (data: FieldValues) => Promise<void>;
};

const SearchBarMobile = ({
  className,
  locations,
  categories,
  onSearchSubmit,
}: SearchBarMobileProps) => {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const { isLoading, keywords, pictures, searchActivities } =
    useKeywordSearch();
  const containerRef = useRef(null);
  const { height, width } = useDimensions(containerRef);

  const { handleSubmit } = useSearchProvider();
  const handleSearchSubmit = handleSubmit(async (data) => {
    if (onSearchSubmit) {
      await onSearchSubmit(data);
    }
  });

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          'fixed bottom-0 right-0 z-10 flex flex-col items-center justify-center gap-4 bg-primary p-7 font-medium text-white',
          className
        )}
      >
        <SearchIcon className="size-6" />
        <p>搜尋活動</p>
      </DialogTrigger>
      <DialogContent
        hideCloseButton
        className="block h-svh w-screen p-0"
        ref={containerRef}
      >
        <form onSubmit={handleSearchSubmit}>
          <DialogHeader>
            <DialogTitle asChild className="flex items-end justify-between">
              <div>
                <H2 className="mb-1 ml-3 text-primary">搜尋活動</H2>
                <DialogClose
                  className="bg-primary p-7"
                  onClick={() => {
                    setIsLocationMenuOpen(() => false);
                    setIsCategoryMenuOpen(() => false);
                  }}
                >
                  <XIcon className="size-6 stroke-white" />
                </DialogClose>
              </div>
            </DialogTitle>
          </DialogHeader>
          <SearchField name="keyword">
            {({ value, onChange }) => (
              <ActivityMobileField
                activityKeywords={keywords}
                activityPictures={pictures}
                isLoading={isLoading}
                value={value}
                onChange={(keyword) => {
                  onChange(keyword);
                  searchActivities(keyword);
                }}
              />
            )}
          </SearchField>
          {/* locations menu animation */}
          <SearchField name="location">
            {({ onChange }) => (
              <LocationMobileFieldMenu
                locations={locations}
                height={height}
                width={width}
                menuOpen={isLocationMenuOpen}
                onSelected={(isOpen) => setIsLocationMenuOpen(isOpen)}
                onChange={(val) => {
                  onChange(val);
                  handleSearchSubmit();
                }}
              />
            )}
          </SearchField>

          {/* categories menu animation */}
          <SearchField name="category">
            {({ onChange }) => (
              <CategoryMobileFieldMenu
                categories={categories}
                height={height}
                width={width}
                menuOpen={isCategoryMenuOpen}
                onSelected={(isOpen) => setIsCategoryMenuOpen(isOpen)}
                onChange={(val) => {
                  onChange(val);
                  handleSearchSubmit();
                }}
              />
            )}
          </SearchField>

          <DialogFooter className="absolute bottom-0 left-0 right-0 flex flex-row gap-[1px] font-medium">
            <Popover open={isLocationMenuOpen}>
              <PopoverTrigger asChild>
                <Button
                  className="h-fit w-full gap-2 py-6 data-[state=open]:bg-surface data-[state=open]:text-primary"
                  type="button"
                  onClick={() => {
                    setIsLocationMenuOpen(
                      (isCurrentLocationMenuOpen) => !isCurrentLocationMenuOpen
                    );
                    setIsCategoryMenuOpen(() => false);
                  }}
                >
                  <MapIcon className="size-6" />
                  <p className="text-base font-medium">地區</p>
                </Button>
              </PopoverTrigger>
            </Popover>
            <Popover open={isCategoryMenuOpen}>
              <PopoverTrigger asChild>
                <Button
                  className="h-fit w-full gap-2 py-6 data-[state=open]:bg-surface data-[state=open]:text-primary"
                  type="button"
                  onClick={() => {
                    setIsCategoryMenuOpen(
                      (isCurrentCategoryMenuOpen) => !isCurrentCategoryMenuOpen
                    );
                    setIsLocationMenuOpen(() => false);
                  }}
                >
                  <HashIcon className="size-6" />
                  <p className="text-base font-medium">類型</p>
                </Button>
              </PopoverTrigger>
            </Popover>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBarMobile;
