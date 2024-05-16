import { Button } from '@components/ui/button';
import EventCard from './EventCard';

interface RecommendActivityProps {}

const RecommendActivity: React.FC<RecommendActivityProps> = () => {
  return (
    <section className="w-full">
      <div className="flex w-full items-start justify-between">
        <h1 className="mb-2 text-5xl font-bold leading-10">推薦活動</h1>
        <Button variant="ghost">查看活動</Button>
      </div>
      <hr className="mb-4 mt-2 w-[48px] border-t-2 border-gray-400" />
      <div className="flex w-full flex-col justify-between space-y-4 xl:flex-row xl:space-y-0">
        <EventCard
          title="夕陽海灘派對"
          cover="https://fastly.picsum.photos/id/495/200/200.jpg?hmac=WzrKoNNBWVnlSjTRFVRlUyZghnLUBZJXeXdHNugLsQ4"
          description="在金色夕陽下，與夥伴們一同沙灘狂歡，享受音樂、美食和海浪聲。"
          startTime="2024.1.1"
          endTime="2024.6.30"
          attendeeCount={999}
          location="台北市 / 信義區"
          organizer="台灣蜘蛛人登高社團"
          pricing={100}
          discount={70}
        />
        <EventCard
          title="城市探險尋寶"
          cover="https://fastly.picsum.photos/id/495/200/200.jpg?hmac=WzrKoNNBWVnlSjTRFVRlUyZghnLUBZJXeXdHNugLsQ4"
          description="穿梭於城市的街巷間，透過尋寶遊戲，探索隱藏的文化景點與歷史故事。"
          startTime="2024.7.6"
          endTime="2024.6.30"
          attendeeCount={999}
          location="台北市 / 中正區"
          organizer="臺灣健康教育暨長"
          pricing={100}
          discount={30}
        />
        <EventCard
          title="極光露營體驗"
          cover="https://fastly.picsum.photos/id/495/200/200.jpg?hmac=WzrKoNNBWVnlSjTRFVRlUyZghnLUBZJXeXdHNugLsQ4"
          description="在極光閃耀的北極圈，搭建帳篷，與夥伴們共享營火溫暖，目睹極光的壯麗奇景。"
          startTime="2024.7.6"
          endTime="2024.6.30"
          attendeeCount={999}
          location="台北市 / 中正區"
          organizer="安妮雅喜歡這個"
          pricing={100}
          discount={25}
        />
      </div>
    </section>
  );
};

export default RecommendActivity;
