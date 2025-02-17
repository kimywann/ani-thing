import styled from 'styled-components';
import AnimeList from '../components/AnimeList';

const HomeContainer = styled.div`
  min-height: 100vh;
  padding-top: 10px; // 상단 여백을 줄임
`;

const ContentWrapper = styled.div`
  margin-left: 240px; // 사이드바 너비만큼 여백
  padding: 0 20px;
`;

const Home = () => {
  return (
    <HomeContainer>
      <ContentWrapper>
        <AnimeList />
      </ContentWrapper>
    </HomeContainer>
  );
};
export default Home;
