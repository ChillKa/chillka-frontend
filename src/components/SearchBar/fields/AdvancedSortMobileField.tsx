import { ToggleGroup, ToggleGroupItem } from '@components/ui/toggle-group';
import { H4 } from '@components/ui/typography';
import cn from '@lib/utils';

const AdvancedSortMobileField = () => {
  return (
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
  );
};

export default AdvancedSortMobileField;
