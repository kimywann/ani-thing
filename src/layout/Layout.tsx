import Header from '../components/common/Header';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  min-height: 100vh;
`;

const MainContent = styled.main`
  width: 100%;
  margin-top: 80px; // 헤더와의 간격 증가
  box-sizing: border-box;
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Header />
      <MainContent>{children}</MainContent>
    </LayoutContainer>
  );
};

export default Layout;
