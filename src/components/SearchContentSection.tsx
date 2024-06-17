'use client';

import useMediaQuery from '@hooks/use-media-query';
import { ReactElement } from 'react';

export type SearchContentSectionProps = {
  results: ReactElement;
};
const SearchContentSection = ({ results }: SearchContentSectionProps) => {
  const { matches: isMobile } = useMediaQuery();

  return (
    <section id="result" className="flex w-full grow flex-row gap-6">
      <div className="lg:max-w-[53.5rem] flex w-full flex-col gap-2">
        {results}
      </div>
      {!isMobile && (
        <div className="debug w-full max-w-[26rem]">
          {/* TODO: get by result */}
          result map section
        </div>
      )}
    </section>
  );
};

export default SearchContentSection;
