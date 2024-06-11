'use client';

import { googleOAuthCallback } from '@action/auth';
import CallToActionSection from '@components/CallToActionSection';
import CommentSection from '@components/CommentSection';
import HeroSection from '@components/HeroSection';
import NearbyActivity from '@components/NearbyActivity';
import RecommendActivity from '@components/RecommendActivity';
import SearchBar from '@components/SearchBar';
import TopCategoryMenu from '@components/TopCategoryMenu';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { z } from 'zod';

const Home = () => {
  const searchParams = useSearchParams();
  const accessToken = searchParams.get('accessToken');
  const mySchema = z.string();
  mySchema.parse('123');

  useEffect(() => {
    const handleGoogleOAuth = async () => {
      if (typeof accessToken === 'string') {
        await googleOAuthCallback(accessToken);
      }
    };

    handleGoogleOAuth();
  }, [accessToken]);

  return (
    <>
      <HeroSection className="mx-auto xl:mt-14" />
      <SearchBar className="mx-auto xl:mt-2" />
      <NearbyActivity className="mx-auto mt-24 xl:mt-36" />
      <TopCategoryMenu className="mx-auto mt-24 xl:mt-36" />
      <RecommendActivity className="mx-auto mt-24 xl:mt-36" />
      <CallToActionSection className="mx-auto mt-24 xl:mt-36" />
      <CommentSection className="mx-auto my-24 xl:my-36" />
    </>
  );
};

export default Home;
