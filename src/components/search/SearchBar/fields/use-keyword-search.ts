import { getRecommendActivitiesByKeywordWithDebounce } from '@action/activity';
import { useState } from 'react';
import { ActivityKeyword, ActivityPicture } from './ActivityField';

export const useKeywordSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [keywords, setKeywords] = useState<ActivityKeyword[]>([]);
  const [pictures, setPictures] = useState<ActivityPicture[]>([]);
  const [lastValidResults, setLastValidResults] = useState<{
    keywords: ActivityKeyword[];
    pictures: ActivityPicture[];
  }>({ keywords: [], pictures: [] });

  const searchActivities = (keyword: string) => {
    setIsLoading(true);
    getRecommendActivitiesByKeywordWithDebounce(keyword)
      .then((response) => {
        if (!(response.keyword.length > 0 || response.pictures.length > 0)) {
          return;
        }

        setKeywords(response.keyword);
        setPictures(response.pictures);
        setLastValidResults({
          keywords: response.keyword,
          pictures: response.pictures,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    isLoading,
    keywords: isLoading ? lastValidResults.keywords : keywords,
    pictures: isLoading ? lastValidResults.pictures : pictures,
    searchActivities,
  };
};
