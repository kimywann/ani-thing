export interface Anime {
  id: number;
  title: {
    english: string | null;
    native: string | null;
  };
  coverImage: {
    large: string;
  };
  trailer?: {
    id: string;
    site: string;
  } | null;
  genres: string[];
}

export interface AnimeData {
  Page: {
    media: Anime[];
  };
}

export type AnimeSort = 'TRENDING' | 'ALL_TIME_POPULAR' | 'UPCOMING';
