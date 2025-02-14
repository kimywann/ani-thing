import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  height: 50px;
  background-color: wheat;
  position: relative;
`;

const Logo = styled.div`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  font-size: 24px;
  font-weight: bold;
  color: black;
  margin-bottom: 30px; /* 로고와 항목들 사이에 간격을 주기 위해 margin 추가 */
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
