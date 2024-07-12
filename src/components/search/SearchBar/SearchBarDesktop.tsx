'use client';

import { getRecommendActivitiesByKeywordWithDebounce } from '@action/activity';
import { Button } from '@components/ui/button';
import { H3 } from '@components/ui/typography';
import cn from '@lib/utils';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { FieldValues } from 'react-hook-form';
import { SearchField, useSearchProvider } from './SearchProvider';
import ActivityField, {
  ActivityKeyword,
  ActivityPicture,
} from './fields/ActivityField';
import CategoryFieldMenu, { Category } from './fields/CategoryFieldMenu';
import LocationFieldMenu, { Location } from './fields/LocationFieldMenu';

type SearchBarDesktopProps = {
  className?: string;
  locations: Location[];
  categories: Category[];
  onSearchSubmit?: (data: FieldValues) => Promise<void>;
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
  locations,
  categories,
  onSearchSubmit,
}: SearchBarDesktopProps) => {
  const isSticky = useStickyToFixed('header');
  const [isLoading, setIsLoading] = useState(false);
  const [keywords, setKeywords] = useState<ActivityKeyword[]>([]);
  const [pictures, setPictures] = useState<ActivityPicture[]>([]);

  const [isPending, startTransition] = useTransition();

  const { handleSubmit } = useSearchProvider();
  const handleSearchSubmit = handleSubmit(async (data) => {
    startTransition(async () => {
      if (onSearchSubmit) {
        await onSearchSubmit(data);
      }
    });
  });

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
      <form onSubmit={handleSearchSubmit} className="flex grow">
        <SearchField name="keyword" className="grow">
          {({ value, onChange }) => {
            return (
              <ActivityField
                activityKeywords={keywords}
                activityPictures={pictures}
                isLoading={isLoading}
                value={value}
                onChange={(keyword) => {
                  setIsLoading(true);
                  getRecommendActivitiesByKeywordWithDebounce(keyword)
                    .then((response) => {
                      setKeywords(response.keyword);
                      setPictures(response.pictures);
                    })
                    .finally(() => {
                      setIsLoading(false);
                    });
                  onChange(keyword);
                }}
              />
            );
          }}
        </SearchField>
        <SearchField name="category" className="min-w-64">
          {({ value, onChange }) => (
            <CategoryFieldMenu
              categories={categories}
              value={value}
              onChange={(val) => {
                onChange(val);
                handleSearchSubmit();
              }}
            />
          )}
        </SearchField>
        <SearchField name="location" className="min-w-64">
          {({ value, onChange }) => (
            <LocationFieldMenu
              locations={locations}
              value={value}
              onChange={(val) => {
                onChange(val);
                handleSearchSubmit();
              }}
            />
          )}
        </SearchField>

        <Button
          type="submit"
          className="flex h-auto self-auto px-20 text-xl font-bold"
          disabled={isPending}
        >
          {isPending ? <LoaderCircle className="animate-spin" /> : '搜尋'}
        </Button>
      </form>
    </section>
  );
};
export default SearchBarDesktop;
