'use client';

import { SearchResult } from '@action/activity';
import { SkeletonEventCard } from '@components/EventCard';
import { SkeletonSearchResultEventCard } from '@components/EventCard/SearchResultEventCard';
import { useSearchView } from '@components/search/SearchBar/SearchViewProvider';
import useMediaQuery from '@hooks/use-media-query';
import { useSearchParams } from 'next/navigation';
import { H4 } from '../../../components/ui/typography';
import ResultItems from './ResultItems';

export const SkeletonItems = ({ isMobile }: { isMobile: boolean }) => {
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
      <SkeletonSearchResultEventCard />
      <SkeletonSearchResultEventCard />
    </>
  );
};

export type ResultItemsSectionProps = {
  results: SearchResult;
};
const ResultItemsSection = ({ results }: ResultItemsSectionProps) => {
  const { matches: isMobile } = useMediaQuery();
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');

  const { currentShow, setCenterId } = useSearchView();
  const { activities, total } = results;

  return currentShow === 'results' ? (
    <div
      id="result-list"
      className="mt-7 flex w-full flex-col gap-y-12 xl:max-w-[53.5rem]"
    >
      <div
        id="result-keyword"
        className="flex w-full items-center justify-start"
      >
        <H4>
          「{keyword}」找到{total}個活動
        </H4>
      </div>
      <ResultItems
        results={activities}
        setCenterId={setCenterId}
        isMobile={isMobile}
        className="lg:max-w-[53.5rem] flex w-full flex-col gap-y-12"
      />
    </div>
  ) : null;
};

export default ResultItemsSection;
