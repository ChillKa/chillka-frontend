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
    <div>
      <div className="mb-4 flex justify-between">
        <Input
          variant="form"
          placeholder="搜索名稱或電子郵件"
          className="max-w-sm"
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
            <TableHead className="w-[50px]">
              <SquareCheckBig className="size-4" />
            </TableHead>
            <TableHead>參加者</TableHead>
            <TableHead>帳號</TableHead>
            <TableHead>年齡</TableHead>
            <TableHead>狀態</TableHead>
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
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManagementActivityTable;
