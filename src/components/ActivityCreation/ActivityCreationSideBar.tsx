import { H1, H3 } from '@components/ui/typography';
import cn from '@lib/utils';
import { CircleCheckBigIcon, CircleDashedIcon } from 'lucide-react';

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
    <aside className={cn('space-y-12', className)}>
      <H1>新增活動</H1>
      <div className="space-y-6">
        <H3 className="border-l-4 pl-6">活動內容1/5</H3>
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
        <H3 className="pl-6">票卷設定</H3>
      </div>
    </aside>
  );
};

export default ActivityCreationSideBar;
