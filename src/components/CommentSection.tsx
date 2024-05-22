/*

- [x] 9 dummy datas
- [x] build up the cards for mobile version
- []
- [] fix dispaly

*/

'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@components/ui/carousel';
import { Separator } from '@components/ui/separator';
import cn from '@lib/utils';
import Autoplay from 'embla-carousel-autoplay';
import { CommentType, CommentsDataType } from 'src/types/comments';
import CommentCard from './CommentCard';

/*
fetch data from API - 121
*/

type CommentSectionProps = {
  className: string;
};

const DUMMY_DATA: CommentsDataType = {
  comments: [
    {
      id: '63a9b7e8f4b0d15c8e9d3c47',
      participant: '陳先生',
      profilePicture: 'https://github.com/shadcn.png',
      name: '搖滾殺手樂團聚會',
      date: '2024-01-01T18:25:43.511Z',
      content:
        '關注揪咖一段時間，一開始對這網站感覺到很多疑惑，但實際使用過之後，發現我不但在這邊找到興趣相同的朋友，也開始成為活動的籌辦者。在這半年多以來，我發現我的交友圈擴大了，認識更多不同專業領域的朋友，接下來也打算自己籌辦音樂會，希望能夠成為自己心目中的小巨星！',
    },
    {
      id: '63a9b7e8f4b0d15c8e9d3c48',
      participant: '林小姐',
      profilePicture: 'https://github.com/shadcn.png',
      name: '瑜伽愛好者聚會',
      date: '2024-02-05T10:30:00.000Z',
      content:
        '參加這個瑜伽聚會讓我受益良多，認識了很多同好，也學到了不少新技巧。每週的聚會已經成為我生活的一部分，感謝揪咖平台的支持。',
    },
    {
      id: '63a9b7e8f4b0d15c8e9d3c49',
      participant: '張先生',
      profilePicture: 'https://github.com/shadcn.png',
      name: '攝影愛好者交流',
      date: '2024-03-10T14:15:30.000Z',
      content:
        '這次的攝影聚會讓我收穫滿滿，不僅拍了很多美照，還和其他攝影愛好者交流了心得和技巧。非常期待下一次的活動。',
    },
    {
      id: '63a9b7e8f4b0d15c8e9d3c4a',
      participant: '王小姐',
      profilePicture: 'https://github.com/shadcn.png',
      name: '讀書會',
      date: '2024-04-15T16:45:20.000Z',
      content:
        '參加讀書會的經驗非常好，每次都能聽到不同的觀點和見解，讓我對書中的內容有更深入的理解。揪咖平台真的很棒！',
    },
    {
      id: '63a9b7e8f4b0d15c8e9d3c4b',
      participant: '李先生',
      profilePicture: 'https://github.com/shadcn.png',
      name: '桌遊愛好者聚會',
      date: '2024-01-20T19:00:00.000Z',
      content:
        '這是我第一次參加桌遊聚會，非常有趣！認識了很多新朋友，也學會了幾個新遊戲，期待下一次的聚會。',
    },
    {
      id: '63a9b7e8f4b0d15c8e9d3c4c',
      participant: '趙小姐',
      profilePicture: 'https://github.com/shadcn.png',
      name: '烹飪課程',
      date: '2024-02-25T11:30:45.000Z',
      content:
        '參加烹飪課程讓我學到了很多新菜式，也結識了不少喜歡烹飪的朋友。每次聚會都讓我充滿期待，感謝揪咖提供這麼好的平台。',
    },
    {
      id: '63a9b7e8f4b0d15c8e9d3c4d',
      participant: '周先生',
      profilePicture: 'https://github.com/shadcn.png',
      name: '戶外運動愛好者',
      date: '2024-03-30T07:00:00.000Z',
      content:
        '戶外運動聚會讓我愛上了大自然，每次活動都很開心，也讓我的身心都得到了放鬆。揪咖讓我找到了志同道合的朋友。',
    },
    {
      id: '63a9b7e8f4b0d15c8e9d3c4e',
      participant: '吳小姐',
      profilePicture: 'https://github.com/shadcn.png',
      name: '手工藝愛好者聚會',
      date: '2024-04-01T13:20:30.000Z',
      content:
        '手工藝聚會讓我發現了自己的新興趣，也學到了很多製作手工藝品的技巧。每次聚會都讓我非常期待，謝謝揪咖提供的平台。',
    },
    {
      id: '63a9b7e8f4b0d15c8e9d3c4f',
      participant: '黃先生',
      profilePicture: 'https://github.com/shadcn.png',
      name: '遊戲開發者聚會',
      date: '2024-01-10T09:00:00.000Z',
      content:
        '參加遊戲開發者聚會讓我接觸到了很多新技術，也認識了不少行業內的朋友，對我自己的項目有很大幫助。揪咖真的很棒！',
    },
  ],
  total: 9,
};

const CommentItemRow = ({ rowItems }: { rowItems: CommentType[] }) => (
  <>
    {rowItems.map((item) => (
      <div key={item.id}>
        <CommentCard
          className="mb-6"
          activityName={item.name}
          participant={item.participant}
          profilePicture={item.profilePicture}
          date={item.date}
          content={item.content}
        />
        <Separator className="h-[0.5px] xl:hidden" />
      </div>
    ))}
  </>
);

const CommentSection = ({ className = '' }: CommentSectionProps) => {
  // should add fetch data after backend ready.
  // fetch...
  const data = DUMMY_DATA.comments;

  // Autoplay.globalOptions?.stopOnInteraction;

  const generateItemArrangement = (
    arrangeItems: CommentType[],
    rowLength: number
  ) => {
    const arrangeLength = Math.ceil(arrangeItems.length / rowLength);
    return Array.from({ length: arrangeLength }, (_, index) => {
      const startIndex = index * rowLength;
      const rowItems = arrangeItems.slice(startIndex, startIndex + rowLength);
      return (
        <CarouselItem className="space-y-12" key={index}>
          <CommentItemRow rowItems={rowItems} />
        </CarouselItem>
      );
    });
  };

  return (
    <section className={cn('space-y-12 px-3 text-primary', className)}>
      <h1 className="text-5xl font-bold">
        探索他人的精彩經歷，找到你的下段冒險
      </h1>
      <Separator className="h-0.5 w-12" />
      <Carousel
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 2400,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent>{generateItemArrangement(data, 3)}</CarouselContent>
      </Carousel>
    </section>
  );
};

export default CommentSection;
