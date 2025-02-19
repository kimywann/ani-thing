import styled from 'styled-components';

import { useEffect, useState, useRef } from 'react';
import { fetchTopAnime } from '@/api/animeFetcher';
import { Anime } from '@/types/anime.model';

import { MBTI } from '@/types/mbti.model';
import { mbtiGenres } from '@/constants/mbti.genres';
import { isValidMBTI } from '@/utils/mbti.validator';

import MbtiForm from '@/components/home/MbtiForm';
import Modal from '@/components/common/Modal';

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem; // 헤더와 동일한 패딩

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const FormSection = styled.div`
  margin-bottom: 40px;
`;

const Section = styled.div`
  margin-bottom: 40px;
  position: relative;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  font-weight: bold;
  padding: 0; // 패딩 제거

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 15px;
  }
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

  @media (max-width: 768px) {
    display: none; // 모바일에서는 스크롤 버튼 숨김
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const AniListWrapper = styled.div`
  overflow-x: auto; // 변경: hidden에서 auto로
  padding: 20px 0;
  max-width: 100%;
  -webkit-overflow-scrolling: touch; // 추가: 모바일에서 부드러운 스크롤

  /* 스크롤바 스타일 제거 */
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const AniList = styled.div`
  display: flex;
  gap: 20px;
  width: max-content;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const AniListItem = styled.div`
  text-align: center;
  width: 200px;
  flex-shrink: 0;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 140px; // 모바일에서는 더 작은 크기로
  }

  img {
    width: 150px;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;

    @media (max-width: 768px) {
      width: 120px;
      height: 160px;
    }
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

    @media (max-width: 768px) {
      font-size: 12px;
      max-width: 120px;
    }
  }
`;

const RecommendationSection = styled.div`
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const MbtiTag = styled.span`
  background-color: #4a90e2;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 8px;

  @media (max-width: 768px) {
    padding: 3px 6px;
    font-size: 14px;
  }
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
    let isMounted = true; // 컴포넌트 마운트 상태 추적

    async function getAnime() {
      if (!userMbti) {
        setLoading(false);
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

        if (isMounted) {
          // 컴포넌트가 마운트된 상태일 때만 상태 업데이트
          setTrendingAnime(trending);
          setPopularAnime(popular);
          setUpcomingAnime(upcoming);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    getAnime();

    return () => {
      isMounted = false; // 클린업 함수
    };
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
      <FormSection>
        <MbtiForm onSubmit={handleMbtiSubmit} />
        {userMbti && (
          <div style={{ marginTop: '10px' }}>
            <MbtiTag>{userMbti}</MbtiTag>
            {mbtiGenres[userMbti].map((genre) => genre.name).join(', ')}
          </div>
        )}
      </FormSection>

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
        <div style={{ textAlign: 'center', color: '#666', marginTop: '50px' }}>
          MBTI를 입력하시면 맞춤 애니메이션을 추천해드립니다!
        </div>
      )}
    </Container>
  );
}
