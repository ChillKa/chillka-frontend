import { Button } from '@components/ui/button';
import { Bookmark, Building2, CalendarDays, MapPin, Users } from 'lucide-react';

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
        <div
          id="event-card"
          className="bg-red debug flex h-[564px] w-[416px] flex-col gap-8"
        >
          <div className="relative h-[208px] w-full overflow-hidden">
            <img
              src="https://fastly.picsum.photos/id/495/200/200.jpg?hmac=WzrKoNNBWVnlSjTRFVRlUyZghnLUBZJXeXdHNugLsQ4"
              alt="Descriptive Alt Text"
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-150"
            />
            <span
              className="absolute bottom-0 right-0 flex h-[80px] w-[80px] 
              flex-col items-center justify-center
              gap-2 bg-[#F0EDE7] text-xs"
            >
              <Bookmark />
              收藏
            </span>
          </div>

          <div className="flex h-[88px] flex-col gap-4">
            <h1 className="text-2xl font-semibold">夕陽海灘派對</h1>
            <p className="text-sm text-gray-600">
              在金色夕陽下，與夥伴們一同沙灘狂歡，享受音樂、美食和海浪聲。
            </p>
          </div>

          <div className="flex h-[144px] flex-col justify-between gap-4">
            <div className="flex justify-start gap-4">
              <CalendarDays />
              <p className="font-[400]">活動時間</p>
              <p className="font-[500]">2024.1.1-2024.6.30</p>
            </div>
            <div className="flex justify-start gap-4">
              <Users />
              <p>參加人數</p>
              <p>999</p>
            </div>
            <div className="flex justify-start gap-4">
              <MapPin />
              <p>舉辦位置</p>
              <p>台北市 / 信義區</p>
            </div>
            <div className="flex justify-start gap-4">
              <Building2 />
              <p>主辦單位</p>
              <p>台灣蜘蛛人登高社團</p>
            </div>
          </div>

          <div className="flex h-[28px] items-center justify-start gap-2">
            <span className="text-lg font-bold">NT$100</span>
            <span className="bg-slate-600 px-2 py-1 text-white">70% OFF</span>
          </div>
        </div>
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
