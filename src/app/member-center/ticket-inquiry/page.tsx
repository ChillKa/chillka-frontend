'use client';

import SortOrder from '@components/SortOrder';
import { useState } from 'react';

const TicketInquiry = () => {
  const [sort, setSort] = useState('1');

  const handleSort = (value: string) => setSort(value);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-5xl/none">查詢票券</h1>
        <SortOrder state={sort} changeState={handleSort} />
      </div>
      TicketInquiry
    </div>
  );
};

export default TicketInquiry;
