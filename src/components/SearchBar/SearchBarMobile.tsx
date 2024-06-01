'use client';

import { Button } from '@components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { Popover, PopoverTrigger } from '@components/ui/popover';
import { H2, Small } from '@components/ui/typography';
import cn from '@lib/utils';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { HashIcon, LucideIcon, MapIcon, SearchIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import MenuItemContainer from './MenuItemContainer';
import useDimensions from './use-dimensions';

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
};

const locationMenu = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 800px)`,
    transition: {
      type: 'spring',
      stiffness: 10,
      restDelta: 2,
    },
  }),
  closed: {
    // TODO: use mouse event to get cursor position
    clipPath: 'circle(0px at 40px 800px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const categoryMenu = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 340px 800px)`,
    transition: {
      type: 'spring',
      stiffness: 10,
      restDelta: 2,
    },
  }),
  closed: {
    // TODO: use mouse event to get cursor position
    clipPath: 'circle(0px at 340px 800px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const SearchBarMobile = ({
  className,
  activityPictures,
  activityKeywords,
  locations,
  categories,
  debugMode,
}: SearchBarMobileProps) => {
  const [isCategoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [isLocationMenuOpen, setLocationMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const router = useRouter();

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
      <DialogContent hideCloseButton className="block h-svh w-screen p-0">
        <DialogHeader>
          <DialogTitle asChild className="flex items-end justify-between">
            <div>
              <H2 className="mb-1 ml-3 text-primary">搜尋活動</H2>
              <DialogClose
                className="bg-primary p-7"
                onClick={() => {
                  setLocationMenuOpen(() => false);
                  setCategoryMenuOpen(() => false);
                }}
              >
                <XIcon className="size-6 stroke-white" />
              </DialogClose>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-between text-primary">
          <div className="mx-3 mt-10 flex border-0 border-b border-primary pb-4 pt-2">
            <Input
              type="text"
              placeholder="搜尋活動關鍵字"
              className="h-fit w-full border-none p-0 text-base placeholder:text-primary/50 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={() => {
                /* TODO: add debounce and fetch data form API later */
              }}
            />
            <button
              className="px-3"
              type="button"
              onClick={() => {
                /* TODO: add search method */
                router.push('/');
              }}
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
          initial={false}
          animate={isLocationMenuOpen ? 'open' : 'closed'}
          custom={height}
          ref={containerRef}
        >
          <motion.div
            className="absolute bottom-0 left-0 right-0 top-20 border-t border-primary bg-surface"
            variants={locationMenu}
            layout
          >
            <MenuItemContainer data={locations} />
          </motion.div>
        </motion.div>
        {/* categories menu animation */}
        <motion.div
          initial={false}
          animate={isCategoryMenuOpen ? 'open' : 'closed'}
          custom={height}
          ref={containerRef}
        >
          <motion.div
            className="absolute bottom-0 left-0 right-0 top-20 border-t border-primary bg-surface"
            variants={categoryMenu}
            layout
          >
            <MenuItemContainer data={categories} />
          </motion.div>
        </motion.div>
        <DialogFooter className="absolute bottom-0 left-0 right-0 flex flex-row gap-[1px] font-medium">
          <Popover open={isLocationMenuOpen}>
            <PopoverTrigger asChild>
              <Button
                className="h-fit w-full gap-2 py-6 data-[state=open]:bg-surface data-[state=open]:text-primary"
                type="button"
                onClick={() => {
                  setLocationMenuOpen(
                    (isCurrentLocationMenuOpen) => !isCurrentLocationMenuOpen
                  );
                  setCategoryMenuOpen(() => false);
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
                  setCategoryMenuOpen(
                    (isCurrentCategoryMenuOpen) => !isCurrentCategoryMenuOpen
                  );
                  setLocationMenuOpen(() => false);
                }}
              >
                <HashIcon className="size-6" />
                <p className="text-base font-medium">類型</p>
              </Button>
            </PopoverTrigger>
          </Popover>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBarMobile;
