import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import cn from '@lib/utils';
import ActivityMobileField from './ActivityMobileField';

export type AdvancedActivityMobileFieldProps = {
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

const AdvancedActivityMobileField = ({
  activityKeywords,
  activityPictures,
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
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AdvancedActivityMobileField;
