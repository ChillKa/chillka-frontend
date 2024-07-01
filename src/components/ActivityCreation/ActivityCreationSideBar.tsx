'use client';

import { H1, H3 } from '@components/ui/typography';
import cn from '@lib/utils';
import { useInView } from 'framer-motion';
import { LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { FORM_LIST_DATA, sectionIds } from './fields/utils';

type ActivityCreationSideBarPrpos = {
  className: string;
};

const useIdRef = (tagId: string) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = document.getElementById(tagId);
    if (!element) {
      return undefined; // Early return if no header found
    }
    if (!ref.current) {
      ref.current = element;
    }
  }, [tagId]);

  return ref;
};

const ActivityCreationSideBar = ({
  className,
}: ActivityCreationSideBarPrpos) => {
  const organizerRef = useIdRef(sectionIds.organizer);
  const activityRef = useIdRef(sectionIds.activity);
  const ticketRef = useIdRef(sectionIds.tickets);

  const organizerInView = useInView(organizerRef);
  const isActivityInView = useInView(activityRef);
  const ticketInView = useInView(ticketRef);

  const vissiblePosition = [
    organizerInView,
    isActivityInView,
    ticketInView,
  ].findLastIndex((element) => element);

  return (
    <aside className={cn('sticky top-12 space-y-12 self-start', className)}>
      <H1>新增活動</H1>
      <div className="space-y-6">
        <Link
          className="group flex items-center gap-2 pl-6"
          href="#organizer-setting"
        >
          <H3 className={vissiblePosition === 0 ? 'border-l-4 pl-6' : ''}>
            主辦方資訊
          </H3>
          <LinkIcon className="mt-1 size-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>
        <Link
          className="group flex items-center gap-2 pl-6"
          href="#activity-setting"
        >
          <H3 className={vissiblePosition === 1 ? 'border-l-4 pl-6' : ''}>
            活動內容
          </H3>
          <LinkIcon className="mt-1 size-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>
        <div className="space-y-2 pl-6">
          {FORM_LIST_DATA.map((item) => {
            const { Icon, text } = item;
            return (
              <div key={text} className="flex items-center gap-4">
                <Icon className="inline-block size-4" />
                <span>{text}</span>
              </div>
            );
          })}
        </div>
        <Link
          className="group flex items-center gap-2 pl-6"
          href="#ticket-setting"
        >
          <H3 className={vissiblePosition === 2 ? 'border-l-4 pl-6' : ''}>
            票卷設定
          </H3>
          <LinkIcon className="mt-1 size-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>
      </div>
    </aside>
  );
};

export default ActivityCreationSideBar;
