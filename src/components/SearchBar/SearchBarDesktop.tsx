'use client';

import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { H3, Small } from '@components/ui/typography';
import cn from '@lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import MenuItemContainer from './MenuItemContainer';
import useDimensions from './use-dimensions';

type SearchBarDesktopProps = {
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
};

const menuVariants = {
  open: ({ size = 3000, locationX = 0, locationY = 0 }) => ({
    clipPath: `circle(${size}px at ${locationX}px ${locationY}px)`,
    transition: {
      type: 'spring',
      stiffness: 30,
      restDelta: 2,
    },
  }),
  closed: ({ locationX = 0, locationY = 0 }) => ({
    clipPath: `circle(0px at ${locationX}px ${locationY}px)`,
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  }),
};

const SearchBarDesktop = ({
  className = '',
  activityPictures,
  activityKeywords,
  locations,
  categories,
}: SearchBarDesktopProps) => {
  const [isSearchBarMenuOpen, setSearchBarMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [isLocationMenuOpen, setLocationMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const { height } = useDimensions(containerRef);

  console.log(height);

  return (
    <section
      className={cn(
        'fixed inset-x-0 bottom-0 z-20 mx-auto max-w-[81rem] space-y-6 border-t border-primary bg-surface py-6 text-primary',
        className
      )}
    >
      <H3>依照需求搜尋適合你的活動</H3>
      <form
        className="flex gap-2"
        action={(formData) => {
          // TODO: server action for search data
          console.log(formData);
        }}
      >
        <div className="flex grow">
          <Popover open={isSearchBarMenuOpen}>
            <PopoverTrigger ref={triggerRef} asChild>
              <div
                className={cn(
                  'mt-[1px] grow border-b border-primary py-4',
                  `${!isSearchBarMenuOpen && ' mt-0 border-t'}`
                )}
              >
                <div className="space-y-2 border-x border-primary px-4">
                  <p className="font-bold">活動</p>
                  <Input
                    type="text"
                    className="h-fit w-full border-none p-0 text-base placeholder:text-primary focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="搜尋關鍵字"
                    onSelect={() => {
                      setSearchBarMenuOpen(() => true);
                      setCategoryMenuOpen(() => false);
                      setLocationMenuOpen(() => false);
                    }}
                    onInput={() => {
                      // TODO: debouncing method & search method
                    }}
                    name="keyword"
                  />
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent
              sticky="always"
              side="top"
              align="start"
              sideOffset={0}
              className="mx-auto min-w-[81rem]"
              onPointerDownOutside={(e) => {
                const open = triggerRef.current?.contains(e.target as Node);
                setSearchBarMenuOpen(!!open);
              }}
              onEscapeKeyDown={() => setSearchBarMenuOpen(() => false)}
              // prevent auto focusing for input text
              onOpenAutoFocus={(e) => e.preventDefault()}
              onInteractOutside={(e) => e.preventDefault()}
            >
              <motion.div
                className="border-x border-t border-primary bg-surface py-12"
                variants={menuVariants}
                initial="closed"
                animate={isSearchBarMenuOpen ? 'open' : 'closed'}
                custom={{ size: 2500, locationX: 0, locationY: 500 }}
              >
                <p className="ml-4 text-base font-bold">推薦活動</p>
                <div className="no-scrollbar mt-6 flex gap-4 overflow-x-auto overflow-y-hidden px-4">
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
                <div className="mt-10 px-4 xl:mt-12">
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
              </motion.div>
            </PopoverContent>
          </Popover>
          <Popover onOpenChange={(e) => setCategoryMenuOpen(() => e)}>
            <PopoverTrigger asChild>
              <div
                className={cn(
                  'mt-[1px] min-w-64 border-b border-primary py-4 pl-4',
                  `${!isCategoryMenuOpen && ' mt-0 border-t'}`
                )}
              >
                <button
                  className="block w-full space-y-2 border-r border-primary px-4 text-left"
                  type="button"
                >
                  <p className="font-bold">類型</p>
                  <p className="text-base text-primary">選擇活動類型</p>
                </button>
              </div>
            </PopoverTrigger>
            <PopoverContent
              sticky="always"
              side="top"
              align="start"
              sideOffset={0}
              className="h-[22.625rem] w-64"
            >
              <motion.div
                className="absolute inset-0 border-x border-t border-primary bg-surface"
                variants={menuVariants}
                initial="closed"
                animate={isCategoryMenuOpen ? 'open' : 'closed'}
                custom={{ size: 1000, locationX: 128, locationY: 362 }}
              >
                <MenuItemContainer data={categories} />
              </motion.div>
            </PopoverContent>
          </Popover>
          <Popover onOpenChange={(e) => setLocationMenuOpen(() => e)}>
            <PopoverTrigger asChild>
              <div
                className={cn(
                  'mt-[1px] min-w-64 border-b border-primary py-4 pl-4',
                  `${!isLocationMenuOpen && ' mt-0 border-t'}`
                )}
              >
                <button
                  className="block w-full space-y-2 border-primary px-4 text-left"
                  type="button"
                  onClick={() => {
                    setLocationMenuOpen(
                      (isCurrentLocationMenuOpen) => !isCurrentLocationMenuOpen
                    );
                    setCategoryMenuOpen(() => false);
                    setSearchBarMenuOpen(() => false);
                  }}
                >
                  <p className="font-bold">地區</p>
                  <p className="text-base text-primary">選擇活動地區</p>
                </button>
              </div>
            </PopoverTrigger>
            <PopoverContent
              sticky="always"
              side="top"
              align="start"
              sideOffset={0}
              className="relative h-[22.625rem] w-64"
            >
              <motion.div
                className="absolute inset-0 border-x border-t border-primary bg-surface"
                variants={menuVariants}
                initial="closed"
                animate={isLocationMenuOpen ? 'open' : 'closed'}
                custom={{ size: 1000, locationX: 128, locationY: 362 }}
              >
                <MenuItemContainer data={locations} />
              </motion.div>
            </PopoverContent>
          </Popover>
        </div>
        <Button className="flex h-auto self-auto px-20 text-xl font-bold">
          搜尋活動
        </Button>
      </form>
    </section>
  );
};

export default SearchBarDesktop;
