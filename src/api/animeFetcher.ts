import { GraphQLClient, gql } from 'graphql-request';
import { Anime, AnimeData, AnimeSort } from '../types/anime.model';

const client = new GraphQLClient('https://graphql.anilist.co');

export async function fetchTopAnime(genre?: string, sort: AnimeSort = 'TRENDING'): Promise<Anime[]> {
  const query = gql`
    query ($genre: String, $sort: [MediaSort]) {
      Page(page: 1, perPage: 20) {
        media(genre: $genre, type: ANIME, sort: $sort) {
          id
          title {
            english
            native
          }
          coverImage {
            large
          }
          trailer {
            id
            site
          }
        }
      }
    }
  `;

  const variables = {
    genre,
    sort: getSortValue(sort),
  };

  try {
    const { Page } = await client.request<AnimeData>(query, variables);
    return Page.media;
  } catch (error) {
    console.error('Error fetching anime data:', error);
    throw error;
  }
}

function getSortValue(sort: AnimeSort) {
  switch (sort) {
    case 'TRENDING':
      return ['TRENDING_DESC'];
    case 'ALL_TIME_POPULAR':
      return ['POPULARITY_DESC'];
    case 'UPCOMING':
      return ['START_DATE_DESC'];
    default:
      return ['TRENDING_DESC'];
  }
}
