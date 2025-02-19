import styled from 'styled-components';
import AnimeList from '@/components/home/AnimeList';

const HomeContainer = styled.div`
  width: 100%;
`;

const Home = () => {
  return (
    <HomeContainer>
      <AnimeList />
    </HomeContainer>
  );
};

export default Home;
