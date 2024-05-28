import { fetchFilteredAnimeList } from '@/utils/supabase/actions';
import AnimeCard from './AnimeCard';
import { SimpleGrid } from '@chakra-ui/react';

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
  return (
    <SimpleGrid
      spacing='40px'
      templateColumns='repeat(auto-fill, minmax(320px, 1fr))'
    >
      {animes?.map((anime) => (
        <AnimeCard anime={anime} key={anime.id} />
      ))}
    </SimpleGrid>
  );
}
