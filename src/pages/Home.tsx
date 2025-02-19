import styled from 'styled-components';
import AnimeList from '@/components/home/AnimeList';

const HomeContainer = styled.div`
  padding: 20px;
`;

const ContentWrapper = styled.div`
  max-width: 950px;
  margin: 0 auto;
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
