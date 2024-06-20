import ActivitySection from '@components/AcitivyPage/ActivitySection';
import CoverSection from '@components/AcitivyPage/CoverSection';
import LinkSection from '@components/AcitivyPage/LinkSection';
import MapSection from '@components/AcitivyPage/MapSection';
import OrganizerSection from '@components/AcitivyPage/OrganizerSection';
import QuestionsSetcion from '@components/AcitivyPage/QuestionsSetcion';
import TicketSection from '@components/AcitivyPage/TicketSection';
import { AcitivityResponseType } from 'src/types/activity';

const DUMMY_DATA: AcitivityResponseType = {
  activity: {
    _id: '667371860c810e86ea0c36bc',
    creatorId: '667371860c810e86ea0c36a8',
    name: 'Marilyn Ryan',
    organizer: {
      profilePicture: 'https://picsum.photos/id/237/500/500',
      name: 'Emilio Runolfsson III',
      contactName: 'Ms. Anna Quigley',
      contactPhone: '447.716.7838 x8642',
      contactEmail: 'Jan_Schmeler14@gmail.com',
      websiteName: 'striking-lieutenant.com',
      websiteURL: 'https://shameless-apology.net/',
      _id: '667371860c810e86ea0c36bd',
      createdAt: '2024-06-20T00:02:14.565Z',
      updatedAt: '2024-06-20T00:02:14.565Z',
    },
    cover: [
      'https://picsum.photos/id/13/1920/1920',
      'https://picsum.photos/id/19/1920/1920',
      'https://picsum.photos/id/37/1920/1920',
      'https://picsum.photos/id/40/1920/1920',
    ],
    thumbnail: 'https://loremflickr.com/640/480?lock=2642080390184960',
    startDateTime: '2024-06-19T00:58:59.756Z',
    fromToday: false,
    endDateTime: '2025-01-17T22:33:44.374Z',
    noEndDate: false,
    category: '遊戲',
    type: '室外',
    link: 'https://delightful-ambience.name',
    location: '東部',
    address: '710 The Orchard',
    summary: 'Conventus templum temporibus vado.',
    details:
      'Vehemens tabesco armarium aestas dens urbs. Adsuesco cubitum aiunt vesco ars aegre adopto tenus surculus. Considero totus adiuvo cultura correptius totam tolero ara delicate uberrime.',
    isPrivate: true,
    displayRemainingTickets: false,
    remainingTickets: 16,
    isRecurring: false,
    recurring: {
      period: '每季',
      week: '每週',
      day: '星期二',
    },
    status: '有效',
    lat: -81.0219,
    lng: -121.1241,
    saved: false,
    participated: false,
    participantCapacity: 56,
    unlimitedQuantity: false,
    __v: 0,
    createdAt: '2024-06-20T00:02:14.565Z',
    updatedAt: '2024-06-20T00:02:14.565Z',
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
          userId: '6656060a066cd51095906678',
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
      createdAt: '2024-06-16T08:20:10.606Z',
      updatedAt: '2024-06-16T02:41:10.606Z',
      __v: 0,
    },
  ],
};

function page() {
  return (
    <>
      <CoverSection className="" covers={DUMMY_DATA.activity.cover} />
      <div className="mx-auto mb-24 mt-6 xl:mt-12 xl:flex xl:max-w-[81rem] xl:justify-between xl:space-x-[7.75rem]">
        <div className="grow px-3 xl:px-0">
          <ActivitySection
            className=""
            type={DUMMY_DATA.activity.type}
            category={DUMMY_DATA.activity.category}
            name={DUMMY_DATA.activity.name}
            location={DUMMY_DATA.activity.location}
            address={DUMMY_DATA.activity.address}
            unlimitedQuantity={DUMMY_DATA.activity.unlimitedQuantity}
            participantCapacity={DUMMY_DATA.activity.participantCapacity}
            websiteName={DUMMY_DATA.activity.organizer.websiteName}
            websiteURL={DUMMY_DATA.activity.organizer.websiteURL}
            summary={DUMMY_DATA.activity.summary}
            details={DUMMY_DATA.activity.details}
          />
          {DUMMY_DATA.activity.type === '線下' ? (
            <MapSection
              className=""
              location={DUMMY_DATA.activity.location}
              address={DUMMY_DATA.activity.address}
            />
          ) : (
            <LinkSection className="" />
          )}
          <OrganizerSection
            className=""
            organizer={DUMMY_DATA.activity.organizer.name}
            profilePicture={DUMMY_DATA.activity.organizer.profilePicture}
            contactName={DUMMY_DATA.activity.organizer.contactName}
            contactPhone={DUMMY_DATA.activity.organizer.contactPhone}
            contactEmail={DUMMY_DATA.activity.organizer.contactEmail}
          />
          <QuestionsSetcion
            className="border-primary"
            questions={DUMMY_DATA.questions}
            creatorId={DUMMY_DATA.activity.creatorId}
          />
        </div>
        <TicketSection
          className=""
          participated={DUMMY_DATA.activity?.participated ?? false}
          saved={DUMMY_DATA.activity?.saved ?? false}
          organizer={DUMMY_DATA.activity.organizer.name}
          profilePicture={DUMMY_DATA.activity.organizer.profilePicture}
          name={DUMMY_DATA.activity.name}
          type={DUMMY_DATA.activity.type}
          unlimitedQuantity={DUMMY_DATA.activity.unlimitedQuantity}
          participantCapacity={DUMMY_DATA.activity.participantCapacity}
          displayRemainingTickets={DUMMY_DATA.activity.displayRemainingTickets}
          remainingTickets={DUMMY_DATA.activity.remainingTickets}
        />
      </div>
    </>
  );
}

export default page;
