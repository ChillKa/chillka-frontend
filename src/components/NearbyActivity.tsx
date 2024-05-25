import EventCard, {
  FormatDate,
  SkeletonEventCard,
} from '@components/EventCard';
import { Button } from '@components/ui/button';
import { H1 } from '@components/ui/typography';
import cn from '@lib/utils';
import { ArrowUpRight } from 'lucide-react';

const NearbyActivity = () => {
  const result = {
    status: 'success',
    data: [
      {
        id: 0,
        title: '夕陽海灘派對夕陽海灘派對夕陽海灘派對',
        cover:
          'https://fastly.picsum.photos/id/495/200/200.jpg?hmac=WzrKoNNBWVnlSjTRFVRlUyZghnLUBZJXeXdHNugLsQ4',
        description:
          '在金色夕陽下，與夥伴們一同沙灘狂歡，享受音樂、美食和海浪聲。在金色夕陽下，與夥伴們一同沙灘狂歡，享受音樂、美食和海浪聲。',
        startTime: '2024.01.01',
        endTime: '2024.06.30',
        attendeeCount: 999,
        location: '台北市 / 信義區',
        organizer: '台灣蜘蛛人登高社團',
        pricing: 100,
        discount: 70,
        isCollected: true,
      },
      {
        id: 1,
        title: '城市探險尋寶',
        cover:
          'https://fastly.picsum.photos/id/495/200/200.jpg?hmac=WzrKoNNBWVnlSjTRFVRlUyZghnLUBZJXeXdHNugLsQ4',
        description:
          '穿梭於城市的街巷間，透過尋寶遊戲，探索隱藏的文化景點與歷史故事。',
        startTime: '2024.07.06',
        endTime: '2024.06.30',
        attendeeCount: 999,
        location: '台北市 / 中正區',
        organizer: '臺灣健康教育暨長',
        pricing: 100,
        discount: 30,
        isCollected: false,
      },
      {
        id: 2,
        title: '極光露營體驗',
        cover:
          'https://fastly.picsum.photos/id/495/200/200.jpg?hmac=WzrKoNNBWVnlSjTRFVRlUyZghnLUBZJXeXdHNugLsQ4',
        description:
          '在極光閃耀的北極圈，搭建帳篷，與夥伴們共享營火溫暖，目睹極光的壯麗奇景。',
        startTime: '2024.07.06',
        endTime: '2024.06.30',
        attendeeCount: 999,
        location: '台北市 / 中正區',
        organizer: '安妮雅喜歡這個',
        pricing: 100,
        discount: 25,
        isCollected: false,
      },
      {
        id: 3,
        title: '夕陽海灘派對夕陽海灘派對夕陽海灘派對',
        cover:
          'https://fastly.picsum.photos/id/495/200/200.jpg?hmac=WzrKoNNBWVnlSjTRFVRlUyZghnLUBZJXeXdHNugLsQ4',
        description:
          '在金色夕陽下，與夥伴們一同沙灘狂歡，享受音樂、美食和海浪聲。在金色夕陽下，與夥伴們一同沙灘狂歡，享受音樂、美食和海浪聲。',
        startTime: '2024.01.01',
        endTime: '2024.06.30',
        attendeeCount: 999,
        location: '台北市 / 信義區',
        organizer: '台灣蜘蛛人登高社團',
        pricing: 100,
        discount: 70,
        isCollected: true,
      },
      {
        id: 4,
        title: '夕陽海灘派對夕陽海灘派對夕陽海灘派對',
        cover:
          'https://fastly.picsum.photos/id/495/200/200.jpg?hmac=WzrKoNNBWVnlSjTRFVRlUyZghnLUBZJXeXdHNugLsQ4',
        description:
          '在金色夕陽下，與夥伴們一同沙灘狂歡，享受音樂、美食和海浪聲。在金色夕陽下，與夥伴們一同沙灘狂歡，享受音樂、美食和海浪聲。',
        startTime: '2024.01.01',
        endTime: '2024.06.30',
        attendeeCount: 999,
        location: '台北市 / 信義區',
        organizer: '台灣蜘蛛人登高社團',
        pricing: 100,
        discount: 70,
        isCollected: true,
      },
      {
        id: 5,
        title: '夕陽海灘派對夕陽海灘派對夕陽海灘派對',
        cover:
          'https://fastly.picsum.photos/id/495/200/200.jpg?hmac=WzrKoNNBWVnlSjTRFVRlUyZghnLUBZJXeXdHNugLsQ4',
        description:
          '在金色夕陽下，與夥伴們一同沙灘狂歡，享受音樂、美食和海浪聲。在金色夕陽下，與夥伴們一同沙灘狂歡，享受音樂、美食和海浪聲。',
        startTime: '2024.01.01',
        endTime: '2024.06.30',
        attendeeCount: 999,
        location: '台北市 / 信義區',
        organizer: '台灣蜘蛛人登高社團',
        pricing: 100,
        discount: 70,
        isCollected: true,
      },
    ],
  };

  return (
    <section
      className={cn(
        'mx-auto',
        'w-full p-[12.5px] text-primary',
        'xl:w-[81rem] xl:p-0'
      )}
    >
      <div className="flex w-full items-start justify-between">
        <H1>附近活動</H1>
        <button
          type="button"
          className={cn(
            'relative hidden h-12 w-24 justify-between px-0 pb-4 pt-2 font-medium',
            'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:border-t after:bg-primary',
            'after:transition-colors after:duration-300 after:ease-out hover:after:border-primary',
            'xl:flex'
          )}
        >
          查看更多
          <ArrowUpRight />
        </button>
      </div>
      <hr className="mb-12 mt-12 w-12 border-t-2 border-gray-400" />
      <div
        className={cn(
          'flex w-full flex-col justify-between space-y-12',
          'xl:flex-row xl:flex-wrap xl:gap-y-12 xl:space-y-0'
        )}
      >
        {result.status === 'loading'
          ? Array.from({ length: 3 }).map((_, index) => {
              const id = index;
              return <SkeletonEventCard key={id} />;
            })
          : result.data.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                cover={event.cover}
                description={event.description}
                startTime={event.startTime as FormatDate<'YY.MM.DD'>}
                endTime={event.endTime as FormatDate<'YY.MM.DD'>}
                attendeeCount={event.attendeeCount}
                location={event.location}
                organizer={event.organizer}
                pricing={event.pricing}
                discount={event.discount}
                isCollected={event.isCollected}
              />
            ))}
        <Button
          variant="outline"
          className={cn(
            'flex h-14 w-full items-center justify-center gap-4',
            'border border-primary px-8 py-4',
            'text-base font-medium text-primary',
            'xl:hidden',
            'transition-colors hover:bg-primary hover:fill-surface hover:text-surface'
          )}
        >
          查看更多附近活動
          <ArrowUpRight size={16} />
        </Button>
      </div>
    </section>
  );
};

export default NearbyActivity;
