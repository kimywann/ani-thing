import { MBTI, Genre } from '../types/mbti.model';

export const mbtiGenres: Record<MBTI, Genre[]> = {
  INTJ: [
    { name: '심리', value: 'Psychological' },
    { name: '미스터리', value: 'Mystery' },
    { name: 'SF', value: 'Sci-Fi' },
  ],
  INTP: [
    { name: 'SF', value: 'Sci-Fi' },
    { name: '심리', value: 'Psychological' },
    { name: '미스터리', value: 'Mystery' },
  ],
  INFJ: [
    { name: '드라마', value: 'Drama' },
    { name: '판타지', value: 'Fantasy' },
    { name: '심리', value: 'Psychological' },
  ],
  INFP: [
    { name: '판타지', value: 'Fantasy' },
    { name: '드라마', value: 'Drama' },
    { name: '일상', value: 'Slice of Life' },
  ],
  ISTJ: [
    { name: '액션', value: 'Action' },
    { name: '미스터리', value: 'Mystery' },
    { name: '역사', value: 'Historical' },
  ],
  ISTP: [
    { name: '액션', value: 'Action' },
    { name: '모험', value: 'Adventure' },
    { name: 'SF', value: 'Sci-Fi' },
  ],
  ISFJ: [
    { name: '일상', value: 'Slice of Life' },
    { name: '드라마', value: 'Drama' },
    { name: '로맨스', value: 'Romance' },
  ],
  ISFP: [
    { name: '모험', value: 'Adventure' },
    { name: '판타지', value: 'Fantasy' },
    { name: '일상', value: 'Slice of Life' },
  ],
  ENTJ: [
    { name: '액션', value: 'Action' },
    { name: '심리', value: 'Psychological' },
    { name: '미스터리', value: 'Mystery' },
  ],
  ENTP: [
    { name: '코미디', value: 'Comedy' },
    { name: '심리', value: 'Psychological' },
    { name: 'SF', value: 'Sci-Fi' },
  ],
  ENFJ: [
    { name: '드라마', value: 'Drama' },
    { name: '판타지', value: 'Fantasy' },
    { name: '로맨스', value: 'Romance' },
  ],
  ENFP: [
    { name: '코미디', value: 'Comedy' },
    { name: '모험', value: 'Adventure' },
    { name: '판타지', value: 'Fantasy' },
  ],
  ESTJ: [
    { name: '액션', value: 'Action' },
    { name: '미스터리', value: 'Mystery' },
    { name: '밀리터리', value: 'Military' },
  ],
  ESTP: [
    { name: '액션', value: 'Action' },
    { name: '모험', value: 'Adventure' },
    { name: '스포츠', value: 'Sports' },
  ],
  ESFJ: [
    { name: '로맨스', value: 'Romance' },
    { name: '코미디', value: 'Comedy' },
    { name: '일상', value: 'Slice of Life' },
  ],
  ESFP: [
    { name: '코미디', value: 'Comedy' },
    { name: '모험', value: 'Adventure' },
    { name: '로맨스', value: 'Romance' },
  ],
};
