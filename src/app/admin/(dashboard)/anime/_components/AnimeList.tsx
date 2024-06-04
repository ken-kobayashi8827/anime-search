import { fetchFilteredAdminAnimeList } from '@/data/anime';
import AnimeListTable from './Table';

type Props = {
  title: string;
  vodId: number | null;
  sortBy: string;
  order: string;
  currentPage: number;
};

export default async function AnimeList({
  title,
  vodId,
  sortBy,
  order,
  currentPage,
}: Props) {
  const animes = await fetchFilteredAdminAnimeList(
    title,
    vodId,
    currentPage,
    sortBy,
    order
  );

  return <AnimeListTable animes={animes} />;
}
