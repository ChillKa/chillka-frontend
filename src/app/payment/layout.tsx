'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { usePathname } from 'next/navigation';

const PaymentLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <section className="mx-auto flex max-w-[81rem] flex-col gap-1">
      <div className="w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              {pathname === '/payment/select-tickets' ? (
                <BreadcrumbPage>選擇票券</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <p>選擇票券</p>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {pathname === '/payment/fill-info' ? (
                <BreadcrumbPage>填寫資料</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <p>填寫資料</p>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {pathname === '/payment/complete' ? (
                <BreadcrumbPage>訂票完成</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
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
