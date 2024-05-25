import { Stack } from '@chakra-ui/react';
import AnimeCardList from './_components/AnimeCardList';
import Pagination from '@/app/components/Pagination';
import Search from '@/app/components/Search';
import { fetchPublicAnimeListPage } from '@/utils/supabase/actions';

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
  const totalPages = await fetchPublicAnimeListPage(query);

  return (
    <Stack>
      <Search />
      <AnimeCardList query={query} currentPage={currentPage} />
      <Pagination totalPages={totalPages} />
    </Stack>
  );
}
