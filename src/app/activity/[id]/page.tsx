import ActivitySection from '@components/AcitivyPage/ActivitySection';
import CoverSection from '@components/AcitivyPage/CoverSection';
import MapSection from '@components/AcitivyPage/MapSection';
import OrganizerSection from '@components/AcitivyPage/OrganizerSection';
import QuestionsSetcion from '@components/AcitivyPage/QuestionsSetcion';
import TicketSection from '@components/AcitivyPage/TicketSection';

const DUMMY_DATA = {
  activity: {
    organizer: {
      profilePicture: 'https://picsum.photos/id/237/500/500',
      name: 'Mr. Alan Jerde',
      contactName: 'Leona Spencer',
      contactPhone: '244.960.8178 x08518',
      contactEmail: 'Bell.Nitzsche@gmail.com',
      websiteName: 'these-human.org',
      websiteURL: 'https://peaceful-plier.org/',
      _id: '665d1ae831c4b1ab99f575f1',
      createdAt: '2024-06-03T01:22:48.209Z',
      updatedAt: '2024-06-03T01:22:48.209Z',
    },
    name: 'Miss Kelly Dare',
    participantNumber: 0,
    cover: [
      'https://picsum.photos/id/13/1920/1920',
      'https://picsum.photos/id/19/1920/1920',
      'https://picsum.photos/id/37/1920/1920',
      'https://picsum.photos/id/40/1920/1920',
    ],
    thumbnail: 'https://loremflickr.com/640/480?lock=7914678927753216',
    category: '藝術文化',
    type: '線下',
    link: 'https://defensive-mineshaft.net',
    location: 'North Woodrow',
    address: '8412 Albany Road',
    summary: 'Bestia desidero comprehendo votum attollo aggero.',
    details:
      'Urbanus abstergo vitiosus ipsum patria coaegresco. Derideo approbo valde vigilo odit torrens curriculum ocer vitae. Degero vergo vespillo adinventitias blandior beneficium abduco.',
    isRecurring: true,
    recurring: {
      period: '每月',
      week: '每週',
      day: '星期六',
    },
    _id: '665d19b812b31b3aae335a25',
    creatorId: '6656060a066cd51095906678',
    fromToday: false,
    noEndDate: false,
    isPrivate: false,
    displayRemainingTickets: false,
    status: '取消',
    createdAt: '2024-06-03T01:17:44.520Z',
    updatedAt: '2024-06-08T09:01:20.906Z',
    __v: 0,
  },
  tickets: [
    {
      _id: '665d19b812b31b3aae335a28',
      activityId: '665d19b812b31b3aae335a25',
      name: 'VIP星空露營體驗券',
      price: 1200,
      fromToday: false,
      noEndDate: false,
      participantCapacity: 20,
      unlimitedQuantity: false,
      purchaseLimit: 1,
      description:
        '這張星空冒險導覽套票包含專屬導覽、望遠鏡租借和美食饗宴，帶您進入星空的奇妙世界。',
      purchaseDuplicate: false,
      ticketStatus: '可購買',
      __v: 0,
      createdAt: '2024-06-03T01:17:44.524Z',
      updatedAt: '2024-06-03T01:22:48.213Z',
    },
  ],
  questions: [
    {
      replies: [
        {
          _id: '6667c0c7659348e1534c7080',
          activityId: '665d19b812b31b3aae335a25',
          userId: '6657215724e60320ddf55189',
          questionId: '6667b94392675f737af4e43c',
          displayName: 'chillka2',
          type: '回覆',
          content: 'reply1',
          replies: [],
          createdAt: '2024-06-11T03:13:11.496Z',
          updatedAt: '2024-06-11T03:13:11.496Z',
          __v: 0,
        },
        {
          _id: '6667c0ca659348e1534c7085',
          activityId: '665d19b812b31b3aae335a25',
          userId: '6657215724e60320ddf55189',
          questionId: '6667b94392675f737af4e43c',
          displayName: 'chillka2',
          type: '回覆',
          content: 'reply2',
          replies: [],
          createdAt: '2024-06-11T03:13:14.626Z',
          updatedAt: '2024-06-11T03:13:14.626Z',
          __v: 0,
        },
      ],
      _id: '6667b94392675f737af4e43c',
      activityId: '665d19b812b31b3aae335a25',
      userId: '6657215724e60320ddf55189',
      displayName: 'chillka2',
      type: '提問',
      content: 'question2',
      createdAt: '2024-06-11T02:41:07.575Z',
      updatedAt: '2024-06-11T02:41:07.575Z',
      __v: 0,
    },
    {
      replies: [],
      _id: '6667b94692675f737af4e441',
      activityId: '665d19b812b31b3aae335a25',
      userId: '6657215724e60320ddf55189',
      displayName: 'chillka2',
      type: '提問',
      content: 'question3',
      createdAt: '2024-06-11T02:41:10.606Z',
      updatedAt: '2024-06-11T02:41:10.606Z',
      __v: 0,
    },
  ],
};

function page() {
  return (
    <>
      <CoverSection className="" covers={DUMMY_DATA.activity.cover} />
      <div className="mx-auto mb-24 mt-6 xl:mb-[3.5625rem] xl:mt-12 xl:flex xl:max-w-[81rem] xl:justify-between xl:space-x-[7.75rem]">
        <div className="border">
          <ActivitySection />
          <OrganizerSection />
          <MapSection />
          <QuestionsSetcion />
        </div>

        <TicketSection
          className=""
          organizer={DUMMY_DATA.activity.organizer.name}
          profilePicture={DUMMY_DATA.activity.organizer.profilePicture}
          name={DUMMY_DATA.activity.name}
          type={DUMMY_DATA.activity.type}
          participantNumber={DUMMY_DATA.activity.participantNumber}
        />
      </div>
    </>
  );
}

export default page;
