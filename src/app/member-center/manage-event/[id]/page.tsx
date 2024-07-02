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
import { ArrowLeftFromLine } from 'lucide-react';
import Link from 'next/link';

type ManageEventIdPageProps = {
  params: { id: string };
};

const ManageEventIdPage = async ({ params }: ManageEventIdPageProps) => {
  return (
    <div className="relative text-primary">
      <div className="relative mb-6 h-[8.125rem] xl:flex xl:h-fit xl:items-center xl:justify-between">
        <Link
          href="/member-center/manage-event"
          className="flex flex-row gap-2"
        >
          <ArrowLeftFromLine className="size-12" />
          <h1 className="mb-8 text-5xl/none font-bold xl:mb-0">
            台北101觀景票
          </h1>
        </Link>
        {params.id}
      </div>

      <section className="flex flex-col gap-2">
        <div>
          <div className="mb-4 flex justify-between">
            <Input placeholder="搜索名稱" className="max-w-sm" />
            <div>
              <Button variant="outline" disabled className="mr-2">
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
      </section>
    </div>
  );
};

export default ManageEventIdPage;
