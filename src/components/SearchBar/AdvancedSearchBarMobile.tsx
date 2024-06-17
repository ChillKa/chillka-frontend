import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
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
import ActivityMobileField from './fields/ActivityMobileField';
import MenuItemContainer from './fields/MenuItemContainer';

const AdvancedSearchBarMobile = () => {
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

        <section id="content" className="px-3 py-10 ">
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
                  activityKeywords={[]}
                  activityPictures={[]}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger
                className={cn(
                  ' bg-surface px-3 py-6',
                  'min-w-[21.9375rem] border-0 text-xl font-bold '
                )}
              >
                地區
              </AccordionTrigger>
              <AccordionContent className="">
                <MenuItemContainer
                  items={[
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
                  onSelect={undefined}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger
                className={cn(
                  ' bg-surface px-3 py-6',
                  'min-w-[21.9375rem] border-0 text-xl font-bold '
                )}
              >
                類型
              </AccordionTrigger>
              <AccordionContent className="">
                <MenuItemContainer
                  items={[
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
                  onSelect={undefined}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger
                className={cn(
                  ' bg-surface px-3 py-6',
                  'min-w-[21.9375rem] border-0 text-xl font-bold '
                )}
              >
                日期
              </AccordionTrigger>
              <AccordionContent className="">
                <MenuItemContainer
                  items={[
                    {
                      url: '/',
                      text: '即將開始',
                    },
                    {
                      url: '/',
                      text: '今天',
                    },
                    {
                      url: '/',
                      text: '明天',
                    },
                    {
                      url: '/',
                      text: '本周',
                    },
                    {
                      url: '/',
                      text: '下周',
                    },
                    {
                      url: '/',
                      text: '本周末',
                    },
                    {
                      url: '/',
                      text: '下一周',
                    },
                    {
                      url: '/',
                      text: '今天',
                    },
                    {
                      url: '/',
                      text: '自訂日期',
                    },
                  ]}
                  onSelect={undefined}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger
                className={cn(
                  ' bg-surface px-3 py-6',
                  'min-w-[21.9375rem] border-0 text-xl font-bold '
                )}
              >
                形式
              </AccordionTrigger>
              <AccordionContent className="">
                <MenuItemContainer
                  items={[
                    {
                      url: '/',
                      text: '線上聚會',
                    },
                    {
                      url: '/',
                      text: '實體聚會/室內',
                    },
                    {
                      url: '/',
                      text: '實體聚會/室外',
                    },
                  ]}
                  onSelect={undefined}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger
                className={cn(
                  ' bg-surface px-3 py-6',
                  'min-w-[21.9375rem] border-0 text-xl font-bold '
                )}
              >
                距離
              </AccordionTrigger>
              <AccordionContent className="">
                <MenuItemContainer
                  items={[
                    {
                      url: '/',
                      text: '2公里',
                    },
                    {
                      url: '/',
                      text: '5公里',
                    },
                    {
                      url: '/',
                      text: '10公里',
                    },
                    {
                      url: '/',
                      text: '25公里',
                    },
                    {
                      url: '/',
                      text: '50公里',
                    },
                    {
                      url: '/',
                      text: '100公里',
                    },
                  ]}
                  onSelect={undefined}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div id="sort" className="flex flex-col items-start gap-4 px-3 py-6">
            <H4>排序</H4>
            <ToggleGroup
              defaultValue="relative"
              type="single"
              className="flex w-full gap-0"
            >
              <ToggleGroupItem
                value="relative"
                aria-label="Toggle relevance"
                asChild
                className={cn(
                  'h-12 min-w-[163.5px] flex-1 rounded-l-[0.5rem] border-[1px] border-r-0 border-primary',
                  'font-bold',
                  'data-[state=on]:bg-primary data-[state=on]:text-white',
                  'data-[state=off]:bg-surface data-[state=off]:text-primary'
                )}
              >
                <button type="button">相關性</button>
              </ToggleGroupItem>
              <div className="absolute left-1/2 z-10 h-12 -translate-x-1/2 transform border-l border-primary" />
              <ToggleGroupItem
                value="date"
                aria-label="Toggle underline"
                asChild
                className={cn(
                  'h-12 min-w-[163.5px] flex-1 rounded-r-[0.5rem] border-[1px] border-l-0 border-primary',
                  'font-bold',
                  'data-[state=on]:bg-primary data-[state=on]:text-white',
                  'data-[state=off]:bg-surface data-[state=off]:text-primary'
                )}
              >
                <button type="button">日期</button>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div id="sort" className="flex flex-col items-start gap-4 px-3 py-6">
            <H4>顯示</H4>
            <ToggleGroup
              defaultValue="relative"
              type="single"
              className="flex w-full gap-0"
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
              <div className="absolute left-1/2 z-10 h-12 -translate-x-1/2 transform border-l border-primary" />
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
          <div className="flex flex-1 items-center justify-center">
            清除條件
          </div>
          <Button
            type="submit"
            className="min-w-[175.5px] flex-1"
            variant="default"
          >
            搜尋活動
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedSearchBarMobile;
