import Header from '../components/common/Header';
import SideBar from '../components/common/SideBar';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 240px; // 사이드바 너비만큼
  margin-top: 20px; // 헤더 높이만큼
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Header />
      <SideBar />
      <MainContent>{children}</MainContent>
    </LayoutContainer>
  );
};

export default Layout;
