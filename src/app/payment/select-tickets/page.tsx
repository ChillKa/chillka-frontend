'use client';

import OrganizerName from '@components/ActivityPage/OrganizerSection/OrganizerName';
import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { H3, H4 } from '@components/ui/typography';
import { formatActivityTime } from '@lib/dateUtils';
import cn from '@lib/utils';
import {
  CalendarDays,
  MapPin,
  MinusCircle,
  PlusCircle,
  User,
} from 'lucide-react';
import Link from 'next/link';

const data = {
  activity: {
    startDateTime: '2024-07-15T10:00:00Z',
    endDateTime: '2024-07-15T18:00:00Z',
    organizer: {
      _id: 'act123456789',
      profilePicture: '/default.webp',
      name: '123',
      contactName: '123',
      contactPhone: '0933456789',
      contactEmail: 'test@test.com',
      websiteName: 'test',
      websiteURL: 'https://example.com/',
      createdAt: '2024-06-01T09:00:00Z',
      updatedAt: '2024-06-10T14:30:00Z',
    },
    name: '夏日音樂節',
    cover: ['/default.webp'],
    thumbnail: '/default.webp',
    category: '音樂',
    type: '戶外活動',
    link: 'https://example.com/summer-music-fest',
    location: '陽光海灘公園',
    address: '123 海濱大道, 海灘市, 陽光省',
    summary: '一場充滿活力的夏日音樂盛會',
    details: '加入我們的夏日音樂節,享受現場音樂、美食和各種有趣的活動!',
    isRecurring: false,
    _id: 'act123456789',
    creatorId: 'user987654321',
    fromToday: true,
    noEndDate: false,
    isPrivate: false,
    displayRemainingTickets: true,
    status: '已發布',
    createdAt: '2024-06-01T09:00:00Z',
    updatedAt: '2024-06-10T14:30:00Z',
    lat: 25.033,
    lng: 121.5654,
    saved: false,
    participated: false,
    unlimitedQuantity: false,
    remainingTickets: 500,
    totalParticipantCapacity: 1000,
    __v: 0,
  },
  tickets: [],
  questions: [],
};

const PaymentPage = () => {
  return (
    <section className="flex flex-row gap-2">
      <section
        id="ticket-info-section"
        className={cn(
          'fixed bottom-0 h-fit w-full bg-surface xl:relative xl:max-w-[26rem]',
          'bg-surface text-primary transition-opacity',
          'z-10 space-y-4 border-t border-primary px-3 py-4 xl:border xl:px-8 xl:py-6',
          'xl:sticky xl:top-12'
        )}
      >
        <OrganizerName className="" data={data} />
        <H3>{data.activity.name}</H3>
        <div className="space-y-2">
          <div className="flex items-center">
            <CalendarDays />
            <div className="ml-4 text-base font-medium">
              {formatActivityTime(
                data.activity.startDateTime,
                data.activity.endDateTime,
                data.activity.noEndDate
              )}
            </div>
          </div>
          <div className="flex items-center">
            <MapPin />
            <div className="ml-4 text-base font-medium">
              {data.activity.type === '線上' ? (
                `${data.activity.type}活動`
              ) : (
                <div>
                  {data.activity.address}
                  <br />
                  {data.activity.location}
                </div>
              )}
            </div>
          </div>
          {!data.activity.unlimitedQuantity && (
            <div className="flex items-center">
              <User />
              <div className="ml-4 text-base font-medium">
                {data.activity.totalParticipantCapacity}人
                {data.activity.displayRemainingTickets &&
                  `（剩餘名額：${data.activity.remainingTickets}）`}
              </div>
            </div>
          )}
        </div>
      </section>
      <section id="ticket-section" className="flex flex-col gap-2">
        <div className="mb-2 flex flex-row items-center justify-between">
          <H4>請選擇票券</H4>
          <Button variant="default">
            <Link href="/payment/fill-info">下一步</Link>
          </Button>
        </div>
        {Array.from({ length: 6 }).map((_, index) => {
          const num = index;
          return (
            <Card
              key={num}
              id="ticket"
              className="flex w-full flex-row items-center justify-between gap-3 rounded-xl p-1"
            >
              <div className="flex max-w-[70%] flex-col gap-2">
                <H4>早鳥票</H4>
                <p>2024-07-18 19:00 至 07-20 23:59</p>
                <p>
                  早鳥票是限量特惠票種，提供給提前購票的朋友。您將享受更優惠的價格，讓您在音樂節開始之前就能體驗音樂和歡樂的氛圍。
                </p>
              </div>
              <div className="mr-2 flex flex-row gap-2">
                <div>NTD$ 580</div>
                <div className="flex flex-row">
                  <MinusCircle />
                  1
                  <PlusCircle />
                </div>
              </div>
            </Card>
          );
        })}
      </section>
    </section>
  );
};

export default PaymentPage;
