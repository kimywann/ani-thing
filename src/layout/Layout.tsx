import Header from '../components/common/Header';
import SideBar from '../components/common/SideBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <SideBar />
    </>
  );
};

export default Layout;
