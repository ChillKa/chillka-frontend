import { Bookmark, Building2, CalendarDays, MapPin, Users } from 'lucide-react';

interface EventCardProps {
  title: string;
  cover: string;
  description: string;
  startTime: string;
  endTime: string;
  attendeeCount: number;
  location: string;
  organizer: string;
  pricing: number;
  discount?: number;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  cover,
  description,
  startTime,
  endTime,
  attendeeCount,
  location,
  organizer,
  pricing,
  discount,
}) => {
  return (
    <div
      id="event-card"
      className="bg-red debug flex h-[564px] w-[416px] flex-col gap-8"
    >
      <div className="relative h-[208px] w-full overflow-hidden">
        <img
          src={cover}
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
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      <div className="flex h-[144px] flex-col justify-between gap-4">
        <div className="flex justify-start gap-4">
          <CalendarDays />
          <p className="font-[400]">活動時間</p>
          <p className="font-[500]">
            {startTime}-{endTime}
          </p>
        </div>
        <div className="flex justify-start gap-4">
          <Users />
          <p>參加人數</p>
          <p>{attendeeCount}</p>
        </div>
        <div className="flex justify-start gap-4">
          <MapPin />
          <p>舉辦位置</p>
          <p>{location}</p>
        </div>
        <div className="flex justify-start gap-4">
          <Building2 />
          <p>主辦單位</p>
          <p>{organizer}</p>
        </div>
      </div>

      <div className="flex h-[28px] items-center justify-start gap-2">
        <span className="text-lg font-bold">NT${pricing}</span>
        {discount && (
          <span className="bg-slate-600 px-2 py-1 text-white">
            {discount}% OFF
          </span>
        )}
      </div>
    </div>
  );
};

export default EventCard;
