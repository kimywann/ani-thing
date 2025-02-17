import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SideBarContainer = styled.aside`
  width: 200px;
  height: 100vh;
  position: fixed;
  top: 50px;
  left: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SideBarItem = styled.div`
  font-size: medium;
  padding: 8px;
  color: gray;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease; /* 부드러운 변화를 위해 transition 추가 */

  &:hover {
    background-color: rgba(128, 128, 128, 0.1);
    border-radius: 8px;
    transform: scale(0.95); /* hover 시 크기를 95%로 축소 */
  }

  a {
    display: block; /* Link를 block 요소로 설정하여 박스를 전체 영역으로 클릭 가능하게 */
    text-decoration: none; /* 기본 링크 밑줄 제거 */
    color: inherit; /* 부모의 텍스트 색을 상속받음 */
  }
`;

const SideBar = () => {
  return (
    <SideBarContainer>
      <SideBarItem>
        <Link to="/">홈</Link>
      </SideBarItem>
      <SideBarItem>
        <Link to="/discussion">애니 토론 & 투표</Link>
      </SideBarItem>
      <SideBarItem>
        <Link to="/community">커뮤니티</Link>
      </SideBarItem>
    </SideBarContainer>
  );
};

export default SideBar;
