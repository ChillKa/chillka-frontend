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
import { useMemo, useState } from 'react';
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

  // FIXME: extract to divide component
  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log('Camera opened successfully', stream);
    } catch (error) {
      console.error('Error opening camera:', error);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <H2>參加者名單</H2>
        <Button variant="default" onClick={openCamera}>
          檢驗票券
        </Button>
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
                <Checkbox />
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
                <TableRow key={participant.user.userId}>
                  <TableCell>
                    <Checkbox />
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
