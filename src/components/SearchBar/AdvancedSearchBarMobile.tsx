import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
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
                Yes. It adheres to the WAI-ARIA design pattern.
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
                Yes. It adheres to the WAI-ARIA design pattern.
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
                Yes. It adheres to the WAI-ARIA design pattern.
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
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div id="sort" className="flex flex-col items-start gap-4 px-3 py-6">
            <H4>排序</H4>
            <ToggleGroup
              defaultValue="relative"
              type="single"
              className="gap-0"
            >
              <ToggleGroupItem
                value="relative"
                aria-label="Toggle bold"
                asChild
                className={cn(
                  'h-12 min-w-[163.5px] rounded-l-[0.5rem] border-[1px] border-r-0 border-primary',
                  'font-bold',
                  'data-[state=on]:bg-primary data-[state=on]:text-white',
                  'data-[state=off]:bg-surface data-[state=off]:text-primary'
                )}
              >
                <button type="button">相關性</button>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="date"
                aria-label="Toggle underline"
                asChild
                className={cn(
                  'h-12 min-w-[163.5px] rounded-r-[0.5rem] border-[1px] border-l-0 border-primary',
                  'font-bold',
                  'data-[state=on]:bg-primary data-[state=on]:text-white',
                  'data-[state=off]:bg-surface data-[state=off]:text-primary'
                )}
              >
                <button type="button">日期</button>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </section>

        <DialogFooter className="absolute bottom-0 left-0 right-0 flex flex-row gap-[1px] font-medium">
          footer
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedSearchBarMobile;
