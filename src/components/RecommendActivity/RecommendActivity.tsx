import { Button } from '@components/ui/button';
import EventCard from './EventCard';

interface RecommendActivityProps {}

const RecommendActivity: React.FC<RecommendActivityProps> = () => {
  return (
    <section className="debug w-full">
      <div className="flex w-full items-start justify-between">
        <h1 className="mb-2 text-5xl font-bold leading-10">推薦活動</h1>
        <Button variant="ghost">查看活動</Button>
      </div>
      <hr className="mb-4 mt-2 w-[48px] border-t-2 border-gray-400" />
      <div className="flex w-full justify-between">
        <EventCard
          title="夕陽海灘派對"
          description="在金色夕陽下，與夥伴們一同沙灘狂歡，享受音樂、美食和海浪聲。"
          startTime="2024.1.1"
          endTime="2024.6.30"
          attendeeCount={999}
          location="台北市 / 信義區"
          organizer="台灣蜘蛛人登高社團"
          pricing={100}
        />
        <div id="event-card" className="bg-red h-[564px] w-[416px]">
          card2
        </div>
        <div id="event-card" className="bg-red h-[564px] w-[416px]">
          card3
        </div>
      </div>
    </section>
  );
};

export default RecommendActivity;
