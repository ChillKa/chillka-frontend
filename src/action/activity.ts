'use server';

export interface SearchParams {
  keyword: string;
  location: string;
  category: string;
  date: string;
  distance: string;
  sort: string;
  limit: string;
  page: string;
}
interface ContinuousActivity {
  period: string;
  week: string;
  day: string;
}

export interface Activity {
  id: string;
  organizerName: string;
  thumbnail: string;
  name: string;
  category: string;
  startDate: string;
  startTime: string;
  fromToday: boolean;
  endDate: string;
  endTime: string;
  noEndDate: boolean;
  type: string;
  link: string;
  isContinuous: string;
  continuous: ContinuousActivity;
}

export async function getActivitiesByFilter(
  params: Partial<SearchParams>
): Promise<Activity[]> {
  console.log(params);
  return [
    {
      id: '1',
      organizerName: 'Organizer A',
      thumbnail: 'https://example.com/thumbnail1.jpg',
      name: 'Activity A',
      category: 'Category 1',
      startDate: '2024-06-15',
      startTime: '10:00',
      fromToday: true,
      endDate: '2024-06-16',
      endTime: '18:00',
      noEndDate: false,
      type: 'Online',
      link: 'https://example.com/activityA',
      isContinuous: 'Yes',
      continuous: {
        period: 'Weekly',
        week: '2',
        day: 'Wednesday',
      },
    },
    {
      id: '2',
      organizerName: 'Organizer B',
      thumbnail: 'https://example.com/thumbnail2.jpg',
      name: 'Activity B',
      category: 'Category 2',
      startDate: '2024-07-01',
      startTime: '09:00',
      fromToday: false,
      endDate: '2024-07-02',
      endTime: '17:00',
      noEndDate: false,
      type: 'Offline',
      link: 'https://example.com/activityB',
      isContinuous: 'No',
      continuous: {
        period: 'Monthly',
        week: '1',
        day: 'Monday',
      },
    },
  ];
}
