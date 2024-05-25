import { fetchFilteredAnimeList } from '@/utils/supabase/actions';
import AnimeCard from './AnimeCard';
import { SimpleGrid } from '@chakra-ui/react';

type Props = {
  query: string;
  currentPage: number;
};

export default async function AnimeCardList({ query, currentPage }: Props) {
  const animes = await fetchFilteredAnimeList(query, currentPage);
  return (
    <SimpleGrid minChildWidth='320px' spacing='40px'>
      {animes?.map((anime) => (
        <AnimeCard anime={anime} key={anime.id} />
      ))}
    </SimpleGrid>
  );
}
