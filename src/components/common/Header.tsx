import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem;
  height: 20px;
  background-color: #ffffff;
`;

const Logo = styled.div`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  font-size: 24px;
  font-weight: bold;
  color: black;
  cursor: pointer;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Header = () => {
  return (
    <>
      <HeaderContainer>
        <Logo>
          <Link to="/">ANITHING</Link>
        </Logo>
      </HeaderContainer>
    </>
  );
};

export default Header;
