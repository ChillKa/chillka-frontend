import Navbar from '@components/Navbar';

type MemberCenterLayoutProps = {
  children: React.ReactNode;
};

const MemberCenterLayout = ({ children }: MemberCenterLayoutProps) => {
  return (
    <div className="flex items-center justify-center px-[0.75rem] py-[4.75rem]">
      <div className="flex w-full max-w-[81rem]">
        <Navbar className="mr-[8.375rem] hidden w-[19.125rem] xl:block" />
        <div className="debug flex-1">{children}</div>
      </div>
    </div>
  );
};

export default MemberCenterLayout;
