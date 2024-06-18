import cn from '@lib/utils';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        'flex min-h-[calc(100vh-var(--header-height)-var(--footer-height))] w-full justify-center px-3 pb-24 pt-9 xl:px-0 xl:pb-28 xl:pt-20'
      )}
    >
      <div className="w-[23rem]">{children}</div>
    </div>
  );
};

export default Layout;
