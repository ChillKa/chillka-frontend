import RecommendActivity from '@components/RecommendActivity';
import { z } from 'zod';

const Home = () => {
  const mySchema = z.string();
  mySchema.parse('123');

  return (
    <div className="flex flex-col items-center">
      <div>您目前所在位置是首頁</div>

      <div className="h-[708px] w-[1296px]">
        <RecommendActivity />
      </div>
    </div>
  );
};

export default Home;
