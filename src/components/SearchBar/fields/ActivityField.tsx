'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import { Input } from '@components/ui/input';
import { Small } from '@components/ui/typography';
import cn from '@lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { motion } from 'framer-motion';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import menuAnimationVariants from './utils';

export type ActivityKeyword = {
  url: string;
  keyword: string;
};

export type ActivityPicture = {
  thumbnail: string;
  url: string;
  description: string;
};

export type ActivityFieldProps = {
  side?: 'top' | 'bottom';
  activityKeywords: ActivityKeyword[];
  activityPictures: ActivityPicture[];
  value: string;
  onChange: (value: string) => void;
  menuOpen?: boolean;
  onMenuOpen?: (isOpen: boolean) => void;
};

const ActivityField = ({
  side = 'top',
  activityKeywords,
  activityPictures,
  value,
  onChange,
  menuOpen = false,
  onMenuOpen,
}: ActivityFieldProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(menuOpen);
  const searchBarTriggerRef = useRef<HTMLButtonElement | null>(null);
  const searchBarInputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenChange = (open: boolean) => {
    onMenuOpen?.(open);
  };

  return (
    <Popover open={isMenuOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        ref={searchBarTriggerRef}
        asChild
        onClick={() => {
          if (searchBarInputRef.current) {
            searchBarInputRef.current.focus();
          }
        }}
      >
        <div
          className={cn(
            'mt-0 grow border-y border-primary py-4 hover:cursor-pointer data-[state=open]:hover:cursor-default',
            {
              'mb-[1px] border-b-0': side === 'bottom' && isMenuOpen,
              'mt-[1px] border-t-0': side === 'top' && isMenuOpen,
            }
          )}
        >
          <div className="space-y-2 border-x border-primary px-4">
            <p className="font-bold">活動</p>
            <Input
              type="text"
              className="h-fit w-full border-none p-0 text-base placeholder:text-primary focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="搜尋關鍵字"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => {
                setIsMenuOpen(() => true);
              }}
            />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        sticky="always"
        side={side}
        align="start"
        sideOffset={0}
        className={cn(
          'mx-auto min-w-[81rem]',
          `${side === 'bottom' && 'border-b border-t-0'}`,
          `${side === 'top' && 'border-b-0 border-t'}`
        )}
        onPointerDownOutside={(e) => {
          const open = searchBarTriggerRef.current?.contains(e.target as Node);
          setIsMenuOpen(!!open);
        }}
        onEscapeKeyDown={() => setIsMenuOpen(() => false)}
        // prevent auto focusing for input text
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <motion.div
          className="border-x border-primary bg-surface py-12"
          variants={menuAnimationVariants}
          initial="closed"
          animate={isMenuOpen ? 'open' : 'closed'}
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
  );
};

export type ActivityMobileFieldProps = {
  activityKeywords: ActivityKeyword[];
  activityPictures: ActivityPicture[];
  value: string;
  onChange: (value: string) => void;
};

export const ActivityMobileField = ({
  activityKeywords,
  activityPictures,
  value,
  onChange,
}: ActivityMobileFieldProps) => {
  return (
    <div className="flex flex-col justify-between text-primary">
      <div className="mx-3 mt-10 flex border-0 border-b border-primary pb-4 pt-2">
        <Input
          type="text"
          placeholder="搜尋活動關鍵字"
          className="h-fit w-full border-none p-0 text-base placeholder:text-primary/50 focus-visible:ring-0 focus-visible:ring-offset-0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
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
  );
};

export type AdvancedActivityMobileFieldProps = {
  activityKeywords: ActivityKeyword[];
  activityPictures: ActivityPicture[];
  value: string;
  onChange: (value: string) => void;
};

export const AdvancedActivityMobileField = ({
  activityKeywords,
  activityPictures,
  value,
  onChange,
}: AdvancedActivityMobileFieldProps) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger
          className={cn(
            ' bg-surface px-3 py-6',
            'min-w-[21.9375rem] border-0 text-xl font-bold '
          )}
        >
          關鍵字
        </AccordionTrigger>
        <AccordionContent className="">
          <ActivityMobileField
            activityKeywords={activityKeywords}
            activityPictures={activityPictures}
            value={value}
            onChange={onChange}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ActivityField;
