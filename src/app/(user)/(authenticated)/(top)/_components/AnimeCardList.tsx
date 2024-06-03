import AnimeCard from './AnimeCard';
import { SimpleGrid } from '@chakra-ui/react';
import { getUser } from '@/data/auth';
import { fetchFilteredAnimeList } from '@/data/anime';
import { getFavoriteList } from '@/data/favorite';

type Props = {
  title: string;
  vodId: number | null;
  currentPage: number;
};

export default async function AnimeCardList({
  title,
  vodId,
  currentPage,
}: Props) {
  const animes = await fetchFilteredAnimeList(title, vodId, currentPage);
  const user = await getUser();
  const favoriteList = await getFavoriteList();

  return (
    <SimpleGrid
      spacing='40px'
      templateColumns='repeat(auto-fill, minmax(320px, 1fr))'
    >
      {animes?.map((anime) => (
        <AnimeCard
          anime={anime}
          favoriteIds={favoriteList}
          user={user}
          key={anime.id}
        />
      ))}
    </SimpleGrid>
  );
}
