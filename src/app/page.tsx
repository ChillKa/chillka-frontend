import CallToActionSection from '@components/CallToActionSection';
import CommentSection from '@components/CommentSection';
import HeroSection from '@components/HeroSection';
import NearbyActivity from '@components/NearbyActivity';
import RecommendActivity from '@components/RecommendActivity';
import TopCategoryMenu from '@components/TopCategoryMenu';
import { z } from 'zod';

const Home = () => {
  const mySchema = z.string();
  mySchema.parse('123');

  return (
    <div className="mb-36 space-y-24 xl:space-y-36 ">
      <HeroSection className="mx-auto xl:mt-14" />
      <NearbyActivity />
      <TopCategoryMenu className="mx-auto" />
      <RecommendActivity />
      <CallToActionSection className="mx-auto" />
      <CommentSection className="mx-auto" />
    </div>
  );
};

export default Home;
