import { SimpleGrid } from '@chakra-ui/react';
import FavoriteAnimeCard from './FavoriteAnimeCard';
import { getFavoriteAnimeList } from '@/data/favorite';

type Props = {
  currentPage: number;
};

export default async function FavoriteAnimeCardList({ currentPage }: Props) {
  const favoriteAnimeLists = await getFavoriteAnimeList(currentPage);

  return (
    <SimpleGrid
      spacing='40px'
      templateColumns='repeat(auto-fill, minmax(320px, 1fr))'
    >
      {favoriteAnimeLists?.map((favoriteAnime) => (
        <FavoriteAnimeCard anime={favoriteAnime} key={favoriteAnime.id} />
      ))}
    </SimpleGrid>
  );
}
