import { Button } from '@ui/button';
import { z } from 'zod';

const Home = () => {
  const mySchema = z.string();
  mySchema.parse('123');

  return (
    <div>
      <div>您目前所在位置是首頁</div>
      <Button>我是 shadcn ui 的 button </Button>
    </div>
  );
};

export default Home;
