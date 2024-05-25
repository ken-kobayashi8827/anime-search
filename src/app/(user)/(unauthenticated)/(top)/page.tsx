import { Stack } from '@chakra-ui/react';
import AnimeCardList from './_components/AnimeCardList';
import { fetchAnimeListPage } from '@/utils/supabase/admin/actions';
import Pagination from '@/app/components/Pagination';
import Search from '@/app/components/Search';

type SearchParamsType = {
  searchParams?: {
    query?: string;
    sortBy?: string;
    order?: string;
    page?: string;
  };
};

export default async function Home({ searchParams }: SearchParamsType) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchAnimeListPage(query);

  return (
    <Stack>
      <Search />
      <AnimeCardList query={query} currentPage={currentPage} />
      <Pagination totalPages={totalPages} />
    </Stack>
  );
}
