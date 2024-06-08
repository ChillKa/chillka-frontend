import cn from '@lib/utils';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        'mt-6 flex min-h-[calc(100vh-var(--header-height)-var(--footer-height))] w-full justify-center xl:mt-20'
      )}
    >
      <div className="w-[23rem]">{children}</div>
    </div>
  );
};

export default Layout;
