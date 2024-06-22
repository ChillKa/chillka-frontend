'use client';

import SortOrder from '@components/SortOrder';
import { useState } from 'react';

const TicketInquiry = () => {
  const [sort, setSort] = useState('1');
  const [canUse, setCanUse] = useState(true);

  const handleSort = (value: string) => setSort(value);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-5xl/none">查詢票券</h1>
        <SortOrder state={sort} changeState={handleSort} />
      </div>
      <div>
        <div className="flex">
          <button
            className={`mr-[1.5rem] pt-6 ${canUse ? '' : ''} `}
            type="button"
            onClick={() => setCanUse(true)}
          >
            可使用
          </button>
          <button type="button" onClick={() => setCanUse(false)}>
            已使用或過期
          </button>
        </div>
        <ul className="grid grid-cols-[5fr_2fr_2fr_2fr] border-y-[0.0625rem] py-4 text-xl font-bold">
          <li className="text-left">活動名稱</li>
          <li className="text-center">數量</li>
          <li className="text-center">使用期限</li>
          <li className="text-center">開啟票券</li>
        </ul>
      </div>
      TicketInquiry
    </div>
  );
};

export default TicketInquiry;
