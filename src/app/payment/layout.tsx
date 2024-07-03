'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { usePathname } from 'next/navigation';

const PaymentLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const breadcrumbItems = [
    { href: '/payment/select-tickets', label: '選擇票券' },
    { href: '/payment/fill-info', label: '填寫資料' },
    { href: '/payment/complete', label: '訂票完成' },
  ];

  return (
    <section className="mx-auto flex max-w-[81rem] flex-col gap-1">
      <div className="w-full">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => (
              <BreadcrumbItem key={item.href}>
                {pathname === item.href ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  item.label
                )}
                {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
    </section>
  );
};

export default PaymentLayout;
