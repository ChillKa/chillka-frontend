type MemberCenterLayoutProps = {
  children: React.ReactNode;
};

const MemberCenterLayout = ({ children }: MemberCenterLayoutProps) => {
  return (
    <div>
      <p>layout</p>
      {children}
    </div>
  );
};

export default MemberCenterLayout;
