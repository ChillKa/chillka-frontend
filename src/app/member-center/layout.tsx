import Navbar from '@components/Navbar';

type MemberCenterLayoutProps = {
  children: React.ReactNode;
};

const MemberCenterLayout = ({ children }: MemberCenterLayoutProps) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default MemberCenterLayout;
