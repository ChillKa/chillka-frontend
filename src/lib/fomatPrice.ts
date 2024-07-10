/**
 * 格式化價格，將數字或字串轉換為千分位格式的字符串。
 * @param {string | number} price - 要格式化的價格，可以是數字或字串形式。
 * @returns {string} 格式化後的價格字符串，例如：1234567 將返回 "1,234,567"。
 */
export const formatPrice = (price: number | string): string => {
  // 將價格轉換為字符串，並移除可能存在的逗號
  const priceString =
    typeof price === 'string' ? price.replace(/,/g, '') : price.toString();

  // 使用正則表達式在千位處添加逗號
  return priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
