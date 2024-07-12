'use client';

import { Activity } from '@action/activity';
import { SkeletonEventCard } from '@components/EventCard';
import { SkelotonSearchResultEventCard } from '@components/EventCard/SearchResultEventCard';
import useMediaQuery from '@hooks/use-media-query';
import { useSearchParams } from 'next/navigation';
import { H4 } from '../../../components/ui/typography';
import ResultItems from './ResultItems';

export const SkelotonItems = ({ isMobile }: { isMobile: boolean }) => {
  if (isMobile) {
    return (
      <>
        <SkeletonEventCard />
        <SkeletonEventCard />
      </>
    );
  }
  return (
    <>
      <SkelotonSearchResultEventCard />
      <SkelotonSearchResultEventCard />
    </>
  );
};

export type ResultItemsSectionProps = {
  results: Activity[];
  setCenterId: (id: string) => void;
  total?: number;
};
const ResultItemsSection = ({
  results,
  setCenterId,
  total = 0,
}: ResultItemsSectionProps) => {
  const { matches: isMobile } = useMediaQuery();
  const searchParams = useSearchParams();

  const keyword = searchParams.get('keyword');

  return (
    <>
      <div
        id="result-keyword"
        className="flex w-full items-center justify-start"
      >
        <H4>
          「{keyword}」找到{total}個活動
        </H4>
      </div>
      <ResultItems
        results={results}
        setCenterId={setCenterId}
        isMobile={isMobile}
        className="lg:max-w-[53.5rem] flex w-full flex-col gap-y-12"
      />
    </>
  );
};

export default ResultItemsSection;
