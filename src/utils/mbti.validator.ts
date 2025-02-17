import { mbtiGenres } from '../constants/mbti.genres';
import { MBTI } from '../types/mbti.model';

export function isValidMBTI(mbti: string): mbti is MBTI {
  return mbti in mbtiGenres;
}
