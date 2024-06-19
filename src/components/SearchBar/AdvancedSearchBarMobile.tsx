import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { ToggleGroup, ToggleGroupItem } from '@components/ui/toggle-group';
import { H2, H4 } from '@components/ui/typography';
import cn from '@lib/utils';
import { XIcon } from 'lucide-react';
import { MouseEventHandler } from 'react';
import { useFormContext } from 'react-hook-form';
import { AdvancedActivityMobileField } from './fields/ActivityField';
import { AdvancedCategoryMobileField } from './fields/CategoryFieldMenu';
import { AdvancedDateMobileField } from './fields/DateFieldMenu';
import { AdvancedDistanceMobileField } from './fields/DistanceFieldMenu';
import { AdvancedEventTypeMobileField } from './fields/EventTypeFieldMenu';
import { AdvancedLocationMobileField } from './fields/LocationFieldMenu';
import { AdvancedSortMobileField } from './fields/SortFieldMenu';
import { SearchParams } from './fields/utils';

export type AdvancedSearchBarMobileProps = {
  onSearchSubmit?: (value: SearchParams) => void;
  onClearFilter?: () => void;
};

const AdvancedSearchBarMobile = ({
  onSearchSubmit,
  onClearFilter,
}: AdvancedSearchBarMobileProps) => {
  const { getValues } = useFormContext<SearchParams>();
  const handleSearchSubmit: MouseEventHandler<HTMLButtonElement> = () => {
    const values = getValues();
    onSearchSubmit?.(values);
  };
  const handleClearFilter: MouseEventHandler<HTMLButtonElement> = () => {
    onClearFilter?.();
  };

  return (
    <Dialog defaultOpen={false}>
      <DialogTrigger
        className={cn(
          'flex grow flex-row items-center justify-center gap-4',
          'bg-primary font-medium text-white'
        )}
      >
        <p>篩選條件</p>
      </DialogTrigger>
      <DialogContent hideCloseButton className="block h-svh w-screen">
        <DialogHeader>
          <DialogTitle asChild className="flex items-end justify-between">
            <div>
              <H2 className="mb-1 ml-3 text-primary">篩選條件</H2>
              <DialogClose className="bg-primary p-7" onClick={() => {}}>
                <XIcon className="size-6 stroke-white" />
              </DialogClose>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* TODO - Fixed the content height */}
        <section
          id="content"
          className="no-scrollbar max-h-[80vh] overflow-y-scroll px-3 py-10"
        >
          <AdvancedActivityMobileField
            activityKeywords={[]}
            activityPictures={[]}
          />
          <AdvancedLocationMobileField
            locations={[
              {
                text: '北部',
                endElement: <Checkbox />,
              },
              {
                text: '中部',
                endElement: <Checkbox />,
              },
              {
                text: '南部',
                endElement: <Checkbox />,
              },
              {
                text: '東部',
                endElement: <Checkbox />,
              },
              {
                text: '離島',
                endElement: <Checkbox />,
              },
            ]}
          />
          <AdvancedCategoryMobileField
            categories={[
              {
                text: '戶外踏青',
                endElement: <Checkbox />,
              },
              {
                text: '社交活動',
                endElement: <Checkbox />,
              },
              {
                text: '興趣嗜好',
                endElement: <Checkbox />,
              },
              {
                text: '運動健身',
                endElement: <Checkbox />,
              },
              {
                text: '健康生活',
                endElement: <Checkbox />,
              },
              {
                text: '科技玩物',
                endElement: <Checkbox />,
              },
              {
                text: '藝術文化',
                endElement: <Checkbox />,
              },
              {
                text: '遊戲',
                endElement: <Checkbox />,
              },
            ]}
          />

          <AdvancedDateMobileField
            dates={[
              {
                text: '即將開始',
                endElement: <Checkbox />,
              },
              {
                text: '今天',
                endElement: <Checkbox />,
              },
              {
                text: '明天',
                endElement: <Checkbox />,
              },
              {
                text: '本周',
                endElement: <Checkbox />,
              },
              {
                text: '下周',
                endElement: <Checkbox />,
              },
              {
                text: '本周末',
                endElement: <Checkbox />,
              },
              {
                text: '下一周',
                endElement: <Checkbox />,
              },
              {
                text: '自訂日期',
                endElement: <Checkbox />,
              },
            ]}
          />
          <AdvancedEventTypeMobileField
            events={[
              {
                text: '線上聚會',
                endElement: <Checkbox />,
              },
              {
                text: '實體聚會/室內',
                endElement: <Checkbox />,
              },
              {
                text: '實體聚會/室外',
                endElement: <Checkbox />,
              },
            ]}
          />
          <AdvancedDistanceMobileField
            distances={[
              {
                text: '2公里',
                endElement: <Checkbox />,
              },
              {
                text: '5公里',
                endElement: <Checkbox />,
              },
              {
                text: '10公里',
                endElement: <Checkbox />,
              },
              {
                text: '25公里',
                endElement: <Checkbox />,
              },
              {
                text: '50公里',
                endElement: <Checkbox />,
              },
              {
                text: '100公里',
                endElement: <Checkbox />,
              },
            ]}
          />

          <AdvancedSortMobileField />

          <div id="show" className="flex flex-col items-start gap-4 px-3 py-6">
            <H4>顯示</H4>
            <ToggleGroup
              defaultValue="relative"
              type="single"
              className="relative flex w-full gap-0"
            >
              <ToggleGroupItem
                value="relative"
                aria-label="Toggle bold"
                asChild
                className={cn(
                  'h-12 w-full min-w-[163.5px] flex-1 rounded-l-[0.5rem] border-[1px] border-r-0 border-primary',
                  'font-bold',
                  'data-[state=on]:bg-primary data-[state=on]:text-white',
                  'data-[state=off]:bg-surface data-[state=off]:text-primary'
                )}
              >
                <button type="button">活動</button>
              </ToggleGroupItem>
              <div className="absolute left-1/2 h-12 -translate-x-1/2 border-[1px] border-solid border-primary" />
              <ToggleGroupItem
                value="date"
                aria-label="Toggle underline"
                asChild
                className={cn(
                  'h-12 w-full min-w-[163.5px] flex-1 rounded-r-[0.5rem] border-[1px] border-l-0 border-primary',
                  'font-bold',
                  'data-[state=on]:bg-primary data-[state=on]:text-white',
                  'data-[state=off]:bg-surface data-[state=off]:text-primary'
                )}
              >
                <button type="button">團體</button>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </section>

        <DialogFooter className="absolute bottom-0 left-0 right-0 flex w-full flex-row bg-surface px-3 py-4 font-medium">
          <Button
            variant="ghost"
            onClick={handleClearFilter}
            className="flex flex-1 items-center justify-center"
          >
            清除條件
          </Button>
          <Button
            type="submit"
            className="min-w-[175.5px] flex-1"
            variant="default"
            onClick={handleSearchSubmit}
          >
            搜尋活動
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedSearchBarMobile;
