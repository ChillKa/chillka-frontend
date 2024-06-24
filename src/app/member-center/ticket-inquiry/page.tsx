'use client';

import QRCodePopUp from '@components/QRCodePopUp';
import SortOrder from '@components/SortOrder';
import TicketPopUp from '@components/TicketPopUp';
import useWindowSize from '@hooks/use-window-size';
import { useState } from 'react';
import fakerData from './fakerData';

const TicketInquiry = () => {
  const [sort, setSort] = useState('1');
  const [canUse, setCanUse] = useState(true);

  const { width } = useWindowSize();

  const handleSort = (value: string) => setSort(value);

  return (
    <div className="relative text-primary">
      <div className="relative mb-6 h-[8.125rem] xl:flex xl:h-fit xl:items-center xl:justify-between">
        <h1 className="mb-8 text-5xl/none font-bold xl:mb-0">查詢票券</h1>
        <SortOrder
          className="absolute bottom-0 left-0 xl:static"
          state={sort}
          changeState={handleSort}
        />
      </div>
      <div>
        <div className="flex border-b-[0.0625rem] font-bold xl:border-b-0">
          <button
            className={`mr-[1.5rem] pt-6 ${canUse ? 'border-b-4 pb-5' : 'pb-6'} `}
            type="button"
            onClick={() => setCanUse(true)}
          >
            可使用
          </button>
          <button
            className={` pt-6 ${canUse ? 'pb-6' : 'border-b-4 pb-5'} `}
            type="button"
            onClick={() => setCanUse(false)}
          >
            已使用或過期
          </button>
        </div>
        <ul className="hidden grid-cols-[7fr_2fr_2fr_2fr] border-y-[0.0625rem] py-4 text-xl font-bold xl:grid">
          <li className="text-left">活動名稱</li>
          <li className="text-center">數量</li>
          <li className="text-center">使用期限</li>
          <li className="text-center">開啟票券</li>
        </ul>
      </div>
      {canUse &&
        fakerData.map((ticker) => {
          return (
            <TicketPopUp key={ticker.orderNumber}>
              <div className="block grid-cols-[7fr_2fr_2fr_2fr] py-4 text-xl font-bold xl:grid">
                <h3 className="mb-[1.25rem] text-left xl:mb-0 xl:font-bold">
                  {ticker.title}
                </h3>
                <p className="mr-2 inline-block bg-primary px-2 py-1 text-xs/5 font-medium text-white xl:mr-0 xl:flex xl:items-center xl:justify-center xl:bg-surface xl:p-0 xl:text-xl xl:font-bold xl:text-primary">
                  {width > 1366 ? ticker.quantity : `數量：${ticker.quantity}`}
                </p>
                <p className="inline-block bg-primary px-2 py-1 text-xs/5 font-medium text-white xl:flex xl:items-center xl:justify-center xl:bg-surface xl:p-0 xl:text-xl xl:font-bold xl:text-primary">
                  {width > 1366
                    ? ticker.expirationDate
                    : `使用期限：${ticker.expirationDate}`}
                </p>
                <div className="xl:flex xl:items-center xl:justify-center">
                  <QRCodePopUp />
                </div>
              </div>
            </TicketPopUp>
          );
        })}
    </div>
  );
};

export default TicketInquiry;
