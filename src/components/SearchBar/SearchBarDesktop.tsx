'use client';

import { Button } from '@components/ui/button';
import { H3 } from '@components/ui/typography';
import cn from '@lib/utils';
import { FormEventHandler, useEffect, useState } from 'react';
import ActivityField from './fields/ActivityField';
import CategoryFieldMenu, { Category } from './fields/CategoryFieldMenu';
import LocationFieldMenu, { Location } from './fields/LocationFieldMenu';

type SearchBarDesktopProps = {
  className: string;
  onSearchSubmit: FormEventHandler<HTMLFormElement> | undefined;
  activityPictures: Array<{
    thumbnail: string;
    url: string;
    description: string;
  }>;
  activityKeywords: Array<{
    url: string;
    keyword: string;
  }>;
  locations: Location[];
  categories: Category[];
};

export const menuAnimationVariants = {
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

// <----------hook---------->

const useStickyToFixed = (tagName: string) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const header = document.getElementsByTagName(tagName)[0];

    if (!header) {
      return undefined; // Early return if no header found
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '15%', // Assuming this project won't change the height of header & hero section
        threshold: 0.1,
      }
    );

    observer.observe(header);

    return () => {
      if (header) {
        observer.unobserve(header);
      }
    };
  }, [tagName]);

  return isSticky;
};

const SearchBarDesktop = ({
  className = '',
  onSearchSubmit,
  activityPictures,
  activityKeywords,
  locations,
  categories,
}: SearchBarDesktopProps) => {
  const [isSearchBarMenuOpen, setIsSearchBarMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const isSticky = useStickyToFixed('header');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSearchSubmit?.(event);
  };

  return (
    <section
      className={cn(
        'z-20 max-w-[81rem] space-y-6 border-t border-primary bg-surface py-6 text-primary',
        isSticky
          ? 'sticky top-[calc(100svh-12.1875rem)]'
          : 'fixed inset-x-0 bottom-0',
        className
      )}
    >
      <H3>依照需求搜尋適合你的活動</H3>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex grow">
          <ActivityField
            activityKeywords={activityKeywords}
            activityPictures={activityPictures}
            isSearchBarMenuOpen={isSearchBarMenuOpen}
            setIsCategoryMenuOpen={setIsCategoryMenuOpen}
            setIsLocationMenuOpen={setIsLocationMenuOpen}
            setIsSearchBarMenuOpen={setIsSearchBarMenuOpen}
          />
          <CategoryFieldMenu
            isCategoryMenuOpen={isCategoryMenuOpen}
            setIsCategoryMenuOpen={setIsCategoryMenuOpen}
            categories={categories}
          />
          <LocationFieldMenu
            isLocationMenuOpen={isLocationMenuOpen}
            setIsLocationMenuOpen={setIsLocationMenuOpen}
            locations={locations}
          />
        </div>
        <Button
          type="submit"
          className="flex h-auto self-auto px-20 text-xl font-bold"
        >
          搜尋活動
        </Button>
      </form>
    </section>
  );
};
export default SearchBarDesktop;
