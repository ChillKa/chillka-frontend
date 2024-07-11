import { format, toDate, toZonedTime } from 'date-fns-tz';
import { zhTW } from 'date-fns/locale';

/**
 * @param dateString 日期字串，例如 '2024-06-21T12:33:33.476+00:00'
 * @returns 格式化後的日期字串，例如 '2024-07-20（六） 19:00'
 */
export const formatDateWithDayOfWeek = (dateString: string): string => {
  const date = toZonedTime(toDate(dateString), 'Asia/Taipei');
  return format(date, 'yyyy-MM-dd（EEEEE） HH:mm', {
    locale: zhTW,
    timeZone: 'Asia/Taipei',
  });
};

/**
 * @param dateString 日期字串，例如 '2024-06-22T13:42:30.218Z'
 * @returns 格式化後的日期字串，例如 '2024-06-21 20:57'
 */
const formatDateTime = (dateString: string): string => {
  const date = toZonedTime(toDate(dateString), 'Asia/Taipei');
  return format(date, 'yyyy-MM-dd HH:mm', {
    timeZone: 'Asia/Taipei',
  });
};

/**
 * @param startDateTime 活動開始日期時間
 * @param endDateTime 活動結束日期時間（可選）
 * @param noEndDate 是否沒有結束日期
 * @returns 格式化後的活動時間字串
 */
export const formatActivityTime = (
  startDateTime: string,
  endDateTime: string | null,
  noEndDate: boolean
): string => {
  const startFormatted = formatDateWithDayOfWeek(startDateTime);
  const endFormatted = endDateTime
    ? formatDateWithDayOfWeek(endDateTime)
    : null;

  const startDate = toZonedTime(toDate(startDateTime), 'Asia/Taipei');
  const endDate = endDateTime
    ? toZonedTime(toDate(endDateTime), 'Asia/Taipei')
    : null;

  const startYear = format(startDate, 'yyyy', { timeZone: 'Asia/Taipei' });
  const endYear = endDate
    ? format(endDate, 'yyyy', { timeZone: 'Asia/Taipei' })
    : null;

  if (noEndDate) {
    return `${startFormatted} 起`;
  }

  if (endFormatted) {
    if (startYear === endYear) {
      return `${startFormatted} 至 ${endFormatted.slice(5)}`;
    }
    return `${startFormatted} 至 ${endFormatted}`;
  }

  return startFormatted;
};

/**
 * @param startDateTime 票券開始日期時間
 * @param endDateTime 票券結束日期時間（可選）
 * @param noEndDate 是否沒有結束日期
 * @returns 格式化後的活動時間字串
 */
export const formatTicketTime = (
  startDateTime: string,
  endDateTime: string | null,
  noEndDate: boolean
): string => {
  const startFormatted = formatDateTime(startDateTime);
  const endFormatted = endDateTime ? formatDateTime(endDateTime) : null;

  const startDate = toZonedTime(toDate(startDateTime), 'Asia/Taipei');
  const endDate = endDateTime
    ? toZonedTime(toDate(endDateTime), 'Asia/Taipei')
    : null;

  const startYear = format(startDate, 'yyyy', { timeZone: 'Asia/Taipei' });
  const endYear = endDate
    ? format(endDate, 'yyyy', { timeZone: 'Asia/Taipei' })
    : null;

  if (noEndDate) {
    return `${startFormatted} 起`;
  }

  if (endFormatted) {
    if (startYear === endYear) {
      return `${startFormatted} 至 ${endFormatted.slice(5)}`;
    }
    return `${startFormatted} 至 ${endFormatted}`;
  }

  return startFormatted;
};

export default formatDateTime;
