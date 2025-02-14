import styled from 'styled-components';

const HomeContainer = styled.div`
  margin-left: 200px; /* 사이드바 너비만큼 여백 */
  margin-top: 40px; /* 헤더 높이만큼 여백 */
  display: flex;
  justify-content: center; /* 가로 가운데 정렬 */
  align-items: center;
  height: calc(90vh - 50px);
  background-color: lightpink;
`;

const Home = () => {
  return <HomeContainer>Home</HomeContainer>;
};
export default Home;
