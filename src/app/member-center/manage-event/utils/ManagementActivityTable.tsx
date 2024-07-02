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

type ManagementActivityTableProps = {
  id: string;
};

const ManagementActivityTable = ({ id }: ManagementActivityTableProps) => {
  return (
    <>
      <div className="flex flex-row justify-between">
        <H2>參加者名單</H2>
        <Button variant="outline">檢驗票券</Button>
      </div>
      <div>
        <div className="mb-4 flex justify-between">
          <Input placeholder="搜索名稱" className="max-w-sm" />
          <div>
            <Button variant="outline" disabled className="mr-2">
              傳送訊息
            </Button>
          </div>
          {id}
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
            {Array.from({ length: 12 }).map((_, index) => {
              const num = index;
              return (
                <TableRow key={num}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>Tester01</TableCell>
                  <TableCell>qwe123456@gmail.com</TableCell>
                  <TableCell>18</TableCell>
                  <TableCell>已付款</TableCell>
                  <TableCell>2020-01-10</TableCell>
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
