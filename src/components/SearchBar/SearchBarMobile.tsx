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
import { FormField } from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Popover, PopoverTrigger } from '@components/ui/popover';
import { H2, Small } from '@components/ui/typography';
import useDimensions from '@hooks/use-dimensions';
import cn from '@lib/utils';
import { motion } from 'framer-motion';
import { HashIcon, LucideIcon, MapIcon, SearchIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FormEventHandler, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import MenuItemContainer from './fields/MenuItemContainer';

type SearchBarMobileProps = {
  className: string;
  activityPictures: Array<{
    thumbnail: string;
    url: string;
    description: string;
  }>;
  activityKeywords: Array<{
    url: string;
    keyword: string;
  }>;
  locations: Array<{
    url: string;
    text: string;
  }>;
  categories: Array<{
    icon: LucideIcon;
    url: string;
    text: string;
  }>;
  debugMode: boolean;
  onSearchSubmit: FormEventHandler<HTMLFormElement> | null;
};

const menuAnimationVariants = {
  open: ({ size = 3000, locationX = 0, locationY = 800 }) => ({
    clipPath: `circle(${size >= 0 ? 1000 : size}px at ${locationX}px ${locationY >= 0 ? 800 : locationY}px)`,
    transition: {
      type: 'spring',
      stiffness: 30,
      restDelta: 2,
    },
  }),
  closed: ({ locationX = 0, locationY = 800 }) => ({
    clipPath: `circle(0px at ${locationX}px ${locationY >= 0 ? 800 : locationY}px)`,
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  }),
};

const SearchBarMobile = ({
  className,
  activityPictures,
  activityKeywords,
  locations,
  categories,
  onSearchSubmit,
  debugMode,
}: SearchBarMobileProps) => {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const { height, width } = useDimensions(containerRef);

  const { setValue, control } = useFormContext();

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    onSearchSubmit?.(e);
  };

  const handleCategorySelect = (selected: string | number) => {
    setValue('category', selected);
    setIsCategoryMenuOpen(false);
  };
  const handleLocationSelect = (selected: string | number) => {
    setValue('location', selected);
    setIsLocationMenuOpen(false);
  };

  return (
    <Dialog defaultOpen={debugMode}>
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
          <div className="flex flex-col justify-between text-primary">
            <div className="mx-3 mt-10 flex border-0 border-b border-primary pb-4 pt-2">
              <FormField
                control={control}
                name="keyword"
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="搜尋活動關鍵字"
                    className="h-fit w-full border-none p-0 text-base placeholder:text-primary/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                    {...field}
                  />
                )}
              />
              <button
                className="px-3"
                type="submit"
                aria-label="Search activities button"
              >
                <SearchIcon className="size-6" />
              </button>
            </div>
            <div className="mt-4">
              <p className="ml-3 text-base font-bold">推薦活動</p>
              <div className="no-scrollbar mt-6 flex gap-4 overflow-x-auto overflow-y-hidden px-3">
                {activityPictures.map((item) => (
                  <div className="min-w-fit space-y-2" key={item.description}>
                    {/* TODO: link to search page */}
                    <Image
                      src={item.thumbnail}
                      alt={item.description}
                      width={200}
                      height={100}
                      className="h-[6.25rem] w-[12.5rem] object-cover"
                    />
                    <Small>{item.description}</Small>
                  </div>
                ))}
              </div>
              <div className="mt-10 px-3">
                <p className="text-base font-bold">熱門關鍵字</p>
                <div className="mt-6 flex flex-wrap gap-2 overflow-x-auto overflow-y-hidden">
                  {/* TODO: link to search page */}
                  {activityKeywords.map((item) => (
                    <Link
                      href={item.url}
                      className="w-fit rounded-2xl border px-4 py-2 font-medium"
                      key={item.keyword}
                    >
                      {item.keyword}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* locations menu animation */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 top-20 border-t border-primary bg-surface"
            variants={menuAnimationVariants}
            initial="closed"
            animate={isLocationMenuOpen ? 'open' : 'closed'}
            custom={{
              size: height * 2,
              locationX: width / 4,
              locationY: height,
            }}
          >
            <MenuItemContainer
              items={locations}
              onSelect={handleLocationSelect}
            />
          </motion.div>
          {/* categories menu animation */}
          <motion.div
            initial="closed"
            animate={isCategoryMenuOpen ? 'open' : 'closed'}
            className="absolute bottom-0 left-0 right-0 top-20 border-t border-primary bg-surface"
            variants={menuAnimationVariants}
            custom={{
              size: height * 2,
              locationX: (width * 3) / 4,
              locationY: height,
            }}
          >
            <MenuItemContainer
              items={categories}
              onSelect={handleCategorySelect}
            />
          </motion.div>
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
