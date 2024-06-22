'use client';

import ActivitySection from '@components/AcitivyPage/ActivitySection';
import CoverSection from '@components/AcitivyPage/CoverSection';
import LocationSection from '@components/AcitivyPage/LocationSection';
import OrganizerSection from '@components/AcitivyPage/OrganizerSection';
import QuestionsSetcion from '@components/AcitivyPage/QuestionsSetcion';
import TicketSection from '@components/AcitivyPage/TicketSection';
import ActivityProvider, {
  useActivityContext,
} from '@store/ActivityProvider/ActivityProvider';
import { useEffect } from 'react';
import { AcitivityResponseType } from 'src/types/activity';

type PageContentProps = {
  id: string;
  data: AcitivityResponseType | null;
};

const PageContent = ({ id, data }: PageContentProps) => {
  const { loadActivity, setData } = useActivityContext();

  useEffect(() => {
    if (data) return setData(data);
    loadActivity(id);
  }, [id, data, setData, loadActivity]);

  return (
    <>
      <CoverSection className="" />
      <div className="mx-auto mb-24 mt-6 xl:mt-12 xl:flex xl:max-w-[81rem] xl:justify-between xl:space-x-[7.75rem]">
        <div className="grow px-3 xl:px-0">
          <ActivitySection className="" />
          <LocationSection />
          <OrganizerSection className="" />
          <QuestionsSetcion className="border-primary" />
        </div>
        <TicketSection className="" />
      </div>
    </>
  );
};

const DUMMY_DATA = {
  activity: {
    recurring: {
      period: '每月',
      week: '第一週',
      day: '星期五',
    },
    _id: '6676d4c6f57bf0300b885684',
    creatorId: '6676d4c6f57bf0300b885683',
    name: '夏日音樂節｜星光之夜',
    organizer: {
      profilePicture:
        'https://fastly.picsum.photos/id/117/1544/1024.jpg?hmac=xFWtVUv1xkFVVidifC3drKerU_k_za4w28fv5etvxRc',
      name: '音樂之夜有限公司',
      contactName: '劉先生',
      contactPhone: '0987654321',
      contactEmail: 'info@musicnight.com',
      websiteName: 'female-dinosaur.name',
      websiteURL: 'https://putrid-squid.net',
      _id: '6676d4c6f57bf0300b885685',
      createdAt: '2024-06-22T13:42:30.218Z',
      updatedAt: '2024-06-22T13:42:30.218Z',
    },
    cover: [
      'https://loremflickr.com/640/480?lock=3004506180681728',
      'https://loremflickr.com/640/480?lock=6649913433653248',
      'https://loremflickr.com/640/480?lock=2588281518686208',
    ],
    thumbnail: 'https://loremflickr.com/640/480?lock=3115420913500160',
    startDateTime: '2024-06-22T13:42:30.213Z',
    fromToday: true,
    endDateTime: '2024-08-27T09:16:04.757Z',
    noEndDate: false,
    category: '運動健身',
    type: '線下',
    link: 'https://unhappy-interchange.com',
    location: '總統府',
    address: '台北市中正區重慶南路一段122號',
    summary:
      '在夏日星光閃耀之夜,花園音樂廣場將成為您最佳的音樂避暑勝地。這個夏天,我們將舉辦一場盛大的夏日音樂節,帶您進入一個充滿音樂、美食和歡樂的夜晚。',
    details:
      '夏日星空閃耀,夜晚的花園音樂廣場將迎來一場絢爛的音樂盛會!我們將為您呈現一系列豐富多彩的表演和活動,讓您沉浸在音樂和歡樂之中。無論您是音樂愛好者還是對音樂文化充滿好奇,都能在這裡找到屬於自己的音樂樂園。準備好和我們一起度過一個難忘的夏夜了嗎?',
    isPrivate: false,
    displayRemainingTickets: true,
    remainingTickets: 3,
    isRecurring: false,
    status: '有效',
    lat: 25.0399991,
    lng: 121.5119507,
    saved: true,
    participated: false,
    totalParticipantCapacity: 3,
    unlimitedQuantity: false,
    createdAt: '2024-06-22T13:42:30.218Z',
    updatedAt: '2024-06-22T13:42:30.218Z',
    __v: 0,
  },
  tickets: [
    {
      _id: '6676d4c6f57bf0300b885686',
      activityId: '6676d4c6f57bf0300b885684',
      name: 'Tasty Granite Salad',
      price: 344,
      startDateTime: '2024-06-21T15:38:18.854Z',
      fromToday: true,
      endDateTime: '2025-03-17T03:17:58.283Z',
      noEndDate: true,
      participantCapacity: 3,
      soldNumber: 0,
      unlimitedQuantity: false,
      purchaseLimit: 7,
      description:
        'Vorago tertius sustineo eos sulum eligendi tamdiu ago bellicus.',
      purchaseDuplicate: true,
      ticketStatus: '可購買',
      createdAt: '2024-06-22T13:42:30.217Z',
      updatedAt: '2024-06-22T13:42:30.217Z',
      __v: 0,
    },
  ],
  questions: [],
};

const Page: React.FC<{
  params: { id: string };
}> = ({ params }) => {
  const data = DUMMY_DATA;
  return (
    <ActivityProvider>
      <PageContent id={params.id} data={data ?? null} />
    </ActivityProvider>
  );
};

export default Page;
