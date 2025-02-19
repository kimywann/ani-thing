import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 1rem 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 20px;
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: black;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 24px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const NavItem = styled(Link)`
  color: #666;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.2s;

  &:hover {
    color: #4a90e2;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <Link to="/">ANITHING</Link>
        </Logo>
        <Nav>
          <NavItem to="/discussion">애니 토론 & 투표</NavItem>
          <NavItem to="/community">커뮤니티</NavItem>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
