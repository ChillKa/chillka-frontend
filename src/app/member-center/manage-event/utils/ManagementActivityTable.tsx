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
import { H2 } from '@components/ui/typography';
import { SquareCheckBig } from 'lucide-react';
import { useMemo, useState } from 'react';
import QRCodeScannerDialogButton from './QRCodeScannerDialogButton';
import { Participant } from './types';

type ManagementActivityTableProps = {
  participants: Participant[];
};

const ManagementActivityTable = ({
  participants,
}: ManagementActivityTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredParticipants = useMemo(() => {
    return participants.filter((participant) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        participant.user.userRealName.toLowerCase().includes(searchLower) ||
        participant.user.email.toLowerCase().includes(searchLower)
      );
    });
  }, [participants, searchTerm]);

  // TODO: use route handler to call the method to call api
  const handleScanSuccess = (result: string) => {
    console.log('The result is ', result);
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <H2>參加者名單</H2>

        <QRCodeScannerDialogButton
          onScanSuccess={handleScanSuccess}
          name="檢驗票券"
        />
      </div>
      <div>
        <div className="mb-4 flex justify-between">
          <Input
            variant="form"
            placeholder="搜索名稱或電子郵件"
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div>
            <Button variant="default" disabled className="mr-2">
              傳送訊息
            </Button>
          </div>
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
              <TableHead>最後上線時間</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParticipants.map((participant) => {
              return (
                <TableRow key={participant.user.userId} className="h-14">
                  <TableCell>
                    <Checkbox className="size-4" />
                  </TableCell>
                  <TableCell>{participant.user.userRealName}</TableCell>
                  <TableCell>{participant.user.email}</TableCell>
                  <TableCell>{participant.user.age}</TableCell>
                  <TableCell>{participant.paymentStatus}</TableCell>
                  <TableCell>{participant.user.lastOnlineTime}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ManagementActivityTable;