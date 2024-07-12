'use client';

import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import { Input } from '@components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { SquareCheckBig } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Order } from './types';

type ManagementActivityTableProps = {
  orders: Order[];
};

const ManagementActivityTable = ({ orders }: ManagementActivityTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredParticipants = useMemo(() => {
    return orders.filter((order) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        order.user.displayName.toLowerCase().includes(searchLower) ||
        order.user.email.toLowerCase().includes(searchLower)
      );
    });
  }, [orders, searchTerm]);

  return (
    <>
      <div className="mb-4 flex flex-col justify-between gap-2 xl:flex-row xl:gap-0">
        <Input
          variant="form"
          placeholder="搜尋名稱或電子郵件"
          className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 xl:w-[27rem]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="default" disabled>
          傳送訊息
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <SquareCheckBig className="size-4 text-primary" />
            </TableHead>
            <TableHead className="text-base font-bold text-primary">
              參加者
            </TableHead>
            <TableHead className="text-base font-bold text-primary">
              帳號
            </TableHead>
            <TableHead className="text-base font-bold text-primary">
              年齡
            </TableHead>
            <TableHead className="text-base font-bold text-primary">
              付款狀態
            </TableHead>
            <TableHead className="text-base font-bold text-primary">
              票券狀態
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredParticipants.map((participant) => {
            return (
              <TableRow key={participant.user._id} className="h-14">
                <TableCell>
                  <Checkbox className="size-4" />
                </TableCell>
                <TableCell>{participant.user.displayName}</TableCell>
                <TableCell>{participant.user.email}</TableCell>
                <TableCell>{participant.user.age}</TableCell>
                <TableCell>{participant.payment.status}</TableCell>
                <TableCell>{participant.orderStatus}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default ManagementActivityTable;
