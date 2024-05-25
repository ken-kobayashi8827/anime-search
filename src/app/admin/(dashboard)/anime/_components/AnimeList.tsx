import { fetchFilteredAnimeList } from '@/utils/supabase/admin/actions';
import AnimeListTable from './Table';

type Props = {
  query: string;
  sortBy: string;
  order: string;
  currentPage: number;
};

export default async function AnimeList({
  query,
  sortBy,
  order,
  currentPage,
}: Props) {
  const animes = await fetchFilteredAnimeList(
    query,
    currentPage,
    sortBy,
    order
  );

  return <AnimeListTable animes={animes} />;
}
