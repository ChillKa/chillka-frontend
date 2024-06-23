import { H1, H3 } from '@components/ui/typography';
import cn from '@lib/utils';
import { CircleCheckBigIcon, CircleDashedIcon, LinkIcon } from 'lucide-react';
import Link from 'next/link';

type ActivityCreationSideBarPrpos = {
  className: string;
};

const FORM_LIST_DATA = [
  {
    Icon: CircleCheckBigIcon,
    text: '封面與縮圖',
  },
  {
    Icon: CircleDashedIcon,
    text: '基本資料',
  },
  {
    Icon: CircleDashedIcon,
    text: '形式與地點',
  },
  {
    Icon: CircleDashedIcon,
    text: '摘要及說明',
  },
  {
    Icon: CircleDashedIcon,
    text: '進階設定',
  },
];

const ActivityCreationSideBar = ({
  className,
}: ActivityCreationSideBarPrpos) => {
  return (
    <aside className={cn('sticky top-12 space-y-12 self-start', className)}>
      <H1>新增活動</H1>
      <div className="space-y-6">
        <Link
          className="group flex items-center gap-2 pl-6"
          href="#organizer-setting"
        >
          <H3 className="border-l-4 pl-6">主辦方資訊</H3>
          <LinkIcon className="mt-1 size-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>
        <Link
          className="group flex items-center gap-2 pl-6"
          href="#activity-setting"
        >
          <H3>活動內容</H3>
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
          <H3>票卷設定</H3>
          <LinkIcon className="mt-1 size-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>
      </div>
    </aside>
  );
};

export default ActivityCreationSideBar;
