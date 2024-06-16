'use client';

import { FormField } from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Small } from '@components/ui/typography';
import { Link, SearchIcon } from 'lucide-react';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';

export type ActivityMobileFieldProps = {
  activityKeywords: {
    url: string;
    keyword: string;
  }[];
  activityPictures: {
    thumbnail: string;
    url: string;
    description: string;
  }[];
};

const ActivityMobileField = ({
  activityKeywords,
  activityPictures,
}: ActivityMobileFieldProps) => {
  const { control } = useFormContext();

  return (
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
  );
};

export default ActivityMobileField;
