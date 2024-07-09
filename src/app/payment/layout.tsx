'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { useParams, usePathname } from 'next/navigation';

const PaymentLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { activityId } = useParams();

  return (
    <section className="mx-auto flex max-w-[81rem] flex-col gap-1 px-3 pb-48 xl:px-0">
      <div className="w-full py-12">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              {pathname === `/payment/${activityId}/select-tickets` ? (
                <BreadcrumbPage className="font-medium text-primary">
                  選擇票券
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild className="text-primary/70">
                  <p>選擇票券</p>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {pathname === `/payment/${activityId}/fill-info` ? (
                <BreadcrumbPage className="font-medium text-primary">
                  填寫資料
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild className="text-primary/70">
                  <p>填寫資料</p>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {pathname === `/payment/${activityId}/complete` ? (
                <BreadcrumbPage className="font-medium text-primary">
                  訂票完成
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild className="text-primary/70">
                  <p>訂票完成</p>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
    </section>
  );
};

export default PaymentLayout;
