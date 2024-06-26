import { Separator } from '@components/ui/separator';
import cn from '@lib/utils';
import {
  BotIcon,
  DumbbellIcon,
  Gamepad2Icon,
  HazeIcon,
  HeartIcon,
  LucideIcon,
  PaletteIcon,
  PartyPopperIcon,
  TreesIcon,
} from 'lucide-react';
import { Fragment } from 'react';
import CategoryIconButton from './CategoryIconButton';

type TopCategoryMenuProps = {
  className: string;
};

type ItemType = {
  Icon: LucideIcon;
  text: string;
  url: string;
};

const items: ItemType[] = [
  {
    Icon: TreesIcon,
    text: '戶外踏青',
    url: '/search?category=戶外踏青',
  },
  {
    Icon: PartyPopperIcon,
    text: '社交活動',
    url: '/search?category=社交活動',
  },
  {
    Icon: HeartIcon,
    text: '興趣嗜好',
    url: '/search?category=興趣嗜好',
  },
  {
    Icon: DumbbellIcon,
    text: '運動健身',
    url: '/search?category=運動健身',
  },
  {
    Icon: HazeIcon,
    text: '健康生活',
    url: '/search?category=健康生活',
  },
  {
    Icon: BotIcon,
    text: '科技玩物',
    url: '/search?category=科技玩物',
  },
  {
    Icon: PaletteIcon,
    text: '藝術文化',
    url: '/search?category=藝術文化',
  },
  {
    Icon: Gamepad2Icon,
    text: '遊戲',
    url: '/search?category=遊戲',
  },
];

const CategoryItemRow = ({ rowItems }: { rowItems: ItemType[] }) => (
  <div className="flex h-40 gap-4 xl:h-[18.75rem]">
    {rowItems.map((item, index) => (
      <Fragment key={item.text}>
        <CategoryIconButton
          className="h-full w-full"
          linkURL={item.url}
          categoryName={item.text}
          icon={item.Icon}
        />
        {index < rowItems.length - 1 && (
          <Separator orientation="vertical" className="w-[0.5px]" />
        )}
      </Fragment>
    ))}
  </div>
);

const TopCategoryMenu = ({ className = '' }: TopCategoryMenuProps) => {
  const mobileRowLength = 2;
  const desktopRowLength = 4;

  const generateItemArrangement = (
    arrangeItems: ItemType[],
    rowLength: number
  ) => {
    const arrangeLength = Math.ceil(arrangeItems.length / rowLength);
    return Array.from({ length: arrangeLength }, (_, index) => {
      const startIndex = index * rowLength;
      const rowItems = arrangeItems.slice(startIndex, startIndex + rowLength);
      return (
        <Fragment key={index}>
          <CategoryItemRow rowItems={rowItems} />
          <Separator className="h-[0.5px]" />
        </Fragment>
      );
    });
  };
  const mobileItemArrangement = generateItemArrangement(items, mobileRowLength);

  const desktopItemArrangement = generateItemArrangement(
    items,
    desktopRowLength
  );

  return (
    <section
      className={cn('px-3 text-primary xl:max-w-[81rem] xl:px-0', className)}
    >
      <h1 className="text-5xl font-bold tracking-[-1.2%]">探索最TOP類型</h1>
      <div className="mt-12 flex flex-col gap-6 xl:hidden">
        {mobileItemArrangement}
      </div>
      <div className="hidden xl:mt-12 xl:flex xl:flex-col xl:gap-6">
        {desktopItemArrangement}
      </div>
    </section>
  );
};

export default TopCategoryMenu;
