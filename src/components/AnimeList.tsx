import styled from 'styled-components';

import { useEffect, useState, useRef } from 'react';
import { fetchTopAnime } from '../api/animeFetcher';
import { Anime } from '../types/anime.model';

import { MBTI } from '../constants/mbti/types';
import { mbtiGenres } from '../constants/mbti.genres';
import { isValidMBTI } from '../utils/mbti.validator';

import MbtiForm from './MbtiForm';
import Modal from './common/Modal';

const Section = styled.div`
  margin-bottom: 40px;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  font-weight: bold;
  padding: 0 20px;
`;

const ScrollButton = styled.button<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${(props) => (props.direction === 'left' ? 'left: 0;' : 'right: 0;')}
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: ${(props) => (props.direction === 'left' ? '0 4px 4px 0' : '4px 0 0 4px')};
  padding: 20px 10px;
  cursor: pointer;
  z-index: 1;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const AniListWrapper = styled.div`
  overflow-x: hidden;
  padding: 20px 0;
  max-width: 100%;

  /* 스크롤바 스타일 제거 */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const AniList = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 20px;
  width: max-content;
`;

const AniListItem = styled.div`
  text-align: center;
  width: 200px;
  flex-shrink: 0;
  cursor: pointer;

  img {
    width: 150px;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  img:hover {
    transform: scale(1.1);
  }

  p {
    margin-top: 10px;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
    margin: 10px auto;
  }
`;

const RecommendationSection = styled.div`
  margin-bottom: 20px;
`;

const MbtiTag = styled.span`
  background-color: #4a90e2;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 8px;
`;

const Container = styled.div`
  max-width: 100%;
  overflow-x: hidden;
  margin-top: 60px;
`;

export default function AnimeList() {
  const [trendingAnime, setTrendingAnime] = useState<Anime[]>([]);
  const [popularAnime, setPopularAnime] = useState<Anime[]>([]);
  const [upcomingAnime, setUpcomingAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [userMbti, setUserMbti] = useState<MBTI | null>(null);

  useEffect(() => {
    async function getAnime() {
      if (!userMbti) {
        setLoading(false); // MBTI가 없을 때는 로딩 상태 해제
        return;
      }

      setLoading(true);
      try {
        const genre = mbtiGenres[userMbti][0].value;
        const [trending, popular, upcoming] = await Promise.all([
          fetchTopAnime(genre, 'TRENDING'),
          fetchTopAnime(genre, 'ALL_TIME_POPULAR'),
          fetchTopAnime(genre, 'UPCOMING'),
        ]);

        setTrendingAnime(trending);
        setPopularAnime(popular);
        setUpcomingAnime(upcoming);
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }
    getAnime();
  }, [userMbti]);

  const handleAnimeClick = (anime: Anime) => {
    setSelectedAnime(anime);
  };

  const closeModal = () => {
    setSelectedAnime(null);
  };

  const handleMbtiSubmit = (mbti: string) => {
    const upperMbti = mbti.toUpperCase();
    if (isValidMBTI(upperMbti)) {
      setUserMbti(upperMbti);
    } else {
      alert('올바른 MBTI를 입력해주세요!');
    }
  };

  const AnimeSection = ({ title, animeList }: { title: string; animeList: Anime[] }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
      if (wrapperRef.current) {
        const scrollAmount = 800; // 스크롤할 픽셀 양
        const currentScroll = wrapperRef.current.scrollLeft;
        wrapperRef.current.scrollTo({
          left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
          behavior: 'smooth',
        });
      }
    };

    return (
      <Section>
        <SectionTitle>{title}</SectionTitle>
        <ScrollButton direction="left" onClick={() => scroll('left')}>
          &#10094;
        </ScrollButton>
        <ScrollButton direction="right" onClick={() => scroll('right')}>
          &#10095;
        </ScrollButton>
        <AniListWrapper ref={wrapperRef}>
          <AniList>
            {animeList.map((anime) => (
              <AniListItem key={anime.id} onClick={() => handleAnimeClick(anime)}>
                <img src={anime.coverImage.large} alt={anime.title.english ?? '애니메이션 이미지'} width={150} />
                <p>{anime.title.english ?? anime.title.native}</p>
              </AniListItem>
            ))}
          </AniList>
        </AniListWrapper>
      </Section>
    );
  };

  if (loading && userMbti) return <p>로딩중...</p>;
  if (error) return <p>에러: {error}</p>;

  return (
    <Container>
      <RecommendationSection>
        <MbtiForm onSubmit={handleMbtiSubmit} />
        {userMbti && (
          <div style={{ marginTop: '10px' }}>
            <MbtiTag>{userMbti}</MbtiTag>
            {mbtiGenres[userMbti].map((genre) => genre.name).join(', ')}
          </div>
        )}
      </RecommendationSection>

      {userMbti ? (
        <>
          <AnimeSection title="요즘 화제의 애니" animeList={trendingAnime} />
          <AnimeSection title="역대 인기순" animeList={popularAnime} />
          <AnimeSection title="개봉 예정" animeList={upcomingAnime} />

          <Modal isOpen={!!selectedAnime} onClose={closeModal}>
            {selectedAnime && (
              <>
                <h3>{selectedAnime.title.english || selectedAnime.title.native}</h3>
                {selectedAnime.trailer?.site === 'youtube' ? (
                  <div style={{ marginTop: '20px' }}>
                    <iframe
                      width="100%"
                      height="300"
                      src={`https://www.youtube.com/embed/${selectedAnime.trailer.id}`}
                      title="Anime Trailer"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div style={{ marginTop: '20px', textAlign: 'center', color: '#666' }}>트레일러 영상이 없습니다.</div>
                )}
              </>
            )}
          </Modal>
        </>
      ) : (
        <div style={{ marginTop: '50px', color: '#666' }}>MBTI를 입력하시면 맞춤 애니메이션을 추천해드립니다!</div>
      )}
    </Container>
  );
}
