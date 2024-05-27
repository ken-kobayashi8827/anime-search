import { fetchFilteredAnimeList } from '@/utils/supabase/admin/actions';
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
  const animes = await fetchFilteredAnimeList(
    title,
    vodId,
    currentPage,
    sortBy,
    order
  );

  return <AnimeListTable animes={animes} />;
}
