/**
 * @param dateString 日期字串，例如 '2024-06-21T12:33:33.476+00:00'
 * @returns 格式化後的日期字串，例如 '2024-07-20（六） 19:00'
 */
export const formatDateWithDayOfWeek = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const daysOfWeek = ['日', '一', '二', '三', '四', '五', '六'];
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${year}-${month}-${day}（${dayOfWeek}） ${hours}:${minutes}`;
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

  const startYear = new Date(startDateTime).getFullYear();
  const endYear = endDateTime ? new Date(endDateTime).getFullYear() : null;

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
 * @param dateString 日期字串，例如 '2024-06-21T12:33:33.476+00:00'
 * @returns 格式化後的日期字串，例如 '2024-06-21 20:57'
 */
const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export default formatDateTime;
