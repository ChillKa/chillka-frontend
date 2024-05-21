import RecommendActivity from '@components/RecommendActivity';
import TopCategoryMenu from '@components/TopCategoryMenu';
import { Button } from '@ui/button';
import { z } from 'zod';

const Home = () => {
  const mySchema = z.string();
  mySchema.parse('123');

  return (
    <div className="space-y-36">
      <div>您目前所在位置是首頁</div>
      <Button>我是 shadcn ui 的 button </Button>
      <div id="mock-wrapper" className="flex flex-col items-center">
        <RecommendActivity />
      </div>

      <TopCategoryMenu className="mx-auto" />
    </div>
  );
};

export default Home;
