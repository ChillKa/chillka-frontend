import Navbar from '@components/Navbar';

type MemberCenterLayoutProps = {
  children: React.ReactNode;
};

const MemberCenterLayout = ({ children }: MemberCenterLayoutProps) => {
  return (
    <div className="m-auto my-[1.5rem] flex w-full max-w-[81rem] px-[0.75rem] xl:my-[4.75rem]">
      <Navbar className="mr-[6.375rem] hidden w-[19.125rem] xl:block" />
      <div className="w-full xl:w-[calc(100%-25.5rem)]">{children}</div>
    </div>
  );
};

export default MemberCenterLayout;
