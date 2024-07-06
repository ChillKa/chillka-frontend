'use client';

import { toggleFavoriteActivity } from '@action/activity';
import { isLoggedIn } from '@action/auth';
import { toast } from '@components/ui/use-toast';
import cn from '@lib/utils';
import { cva } from 'class-variance-authority';
import {
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
} from 'lucide-react';
import Image from 'next/image';
import {
  HTMLAttributes,
  useCallback,
  useRef,
  useState,
  useTransition,
} from 'react';

export const collectedVariants = cva(
  'absolute bottom-0 right-0 flex h-20 w-20 flex-col items-center justify-center gap-2 text-xs transition ease-out duration-300 font-medium leading-5',
  {
    variants: {
      collected: {
        true: 'bg-primary text-white',
        false: 'bg-surface text-black',
      },
    },
  }
);

export const discountLabel = (discount: number) => {
  if (discount === -1) {
    return <span className="bg-primary px-2 py-1 text-white">FREE</span>;
  }
  if (discount > 0) {
    return (
      <span className="bg-primary px-2 py-1 text-white">{discount}% OFF</span>
    );
  }
  return null;
};

type EventCardCoverSectionProps = {
  src: string;
  alt?: string;
  collected: boolean;
  activityId: string;
  hoverEffect?: boolean;
  className?: string;
  callbackFunc?: () => Promise<void>;
};
export const EventCardCoverSection = ({
  src,
  alt = 'event-card-cover',
  collected: initialCollected,
  activityId,
  className,
  hoverEffect = true,
  callbackFunc,
}: EventCardCoverSectionProps) => {
  const [collected, setCollected] = useState(initialCollected);
  const [isPending, startTransition] = useTransition();
  const [imageSrc, setImageSrc] = useState(src);

  const handleToggle = useCallback<
    NonNullable<HTMLAttributes<HTMLButtonElement>['onClick']>
  >(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const loggedIn = await isLoggedIn();

      if (!loggedIn) {
        toast({
          title: '請先登入',
          description: '您需要登入才能收藏活動',
          variant: 'destructive',
        });
        return;
      }

      startTransition(async () => {
        try {
          const response = await toggleFavoriteActivity(activityId);
          if (response?.message) {
            toast({
              title: response.message,
              variant:
                response.status === 'success' ? 'default' : 'destructive',
            });
          }
          if (response?.status === 'success') {
            setCollected((prev) => !prev);
            if (callbackFunc) callbackFunc();
          }
        } catch (error) {
          console.error('Error toggling favorite activity:', error);
          toast({
            title: 'An error occurred',
            variant: 'destructive',
          });
        }
      });
    },
    [activityId]
  );

  const renderStatusIcon = () => {
    if (isPending) {
      return <LoaderCircle className="animate-spin" />;
    }
    if (collected) {
      return <Check />;
    }
    return <Bookmark />;
  };

  return (
    <div className={cn('relative h-[13rem] w-full overflow-hidden', className)}>
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes="(max-width: 1366px) 100vw, 33vw"
        placeholder="blur"
        blurDataURL="/loading.webp"
        onLoad={(e) => {
          if (e.currentTarget.naturalWidth === 0) setImageSrc('/default.webp');
        }}
        onError={() => setImageSrc('/default.webp')}
        className={cn(
          'absolute left-0 top-0 h-full w-full object-cover',
          hoverEffect &&
            'transition-transform duration-300 ease-out hover:scale-150'
        )}
      />
      <button
        type="button"
        onClick={handleToggle}
        disabled={isPending}
        className={collectedVariants({ collected })}
      >
        {renderStatusIcon()}
        {collected ? '已收藏' : '收藏'}
      </button>
    </div>
  );
};

export const ContinuousCardField = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -100, behavior: 'smooth' });
      if (scrollContainerRef.current.scrollLeft <= 100) {
        setIsScrolled(false);
      }
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 100, behavior: 'smooth' });
      setIsScrolled(true);
    }
  };

  return (
    <div id="activity-timing" className="relative flex flex-row gap-2">
      <div
        ref={scrollContainerRef}
        className="scrollbar-hide no-scrollbar flex flex-row gap-2 overflow-x-auto"
      >
        <div className="h-12 w-[8.438rem] border-[1px] px-6 py-3">
          <p className="h-full w-full whitespace-nowrap text-base font-medium">
            03.28 19:00
          </p>
        </div>
        <div className="h-12 w-[8.438rem] border-[1px] px-6 py-3">
          <p className="h-full w-full whitespace-nowrap text-base font-medium">
            03.28 19:00
          </p>
        </div>
        <div className="h-12 w-[8.438rem] border-[1px] px-6 py-3">
          <p className="h-full w-full whitespace-nowrap text-base font-medium">
            03.28 19:00
          </p>
        </div>
        <div className="h-12 w-[8.438rem] border-[1px] px-6 py-3">
          <p className="h-full w-full whitespace-nowrap text-base font-medium">
            03.28 19:00
          </p>
        </div>
        <div id="placeholder-box" className="size-12 flex-shrink-0" />
      </div>

      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/5 bg-gradient-to-r from-transparent to-white" />

      <div className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center">
        <button
          type="button"
          aria-label="scroll-right"
          className="size-12 border-[1px] bg-surface p-3"
          onClick={handleScrollRight}
        >
          <ChevronRight className="size-6" />
        </button>
      </div>

      {isScrolled && (
        <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center">
          <button
            type="button"
            aria-label="scroll-left"
            className="size-12 border-[1px] bg-surface p-3"
            onClick={handleScrollLeft}
          >
            <ChevronLeft className="size-6" />
          </button>
        </div>
      )}
    </div>
  );
};
