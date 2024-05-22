import { fetchAnimeListPage } from '@/utils/supabase/admin/actions';
import { Box, Text } from '@chakra-ui/react';
import Pagination from '@/app/components/Pagination';
import AnimeList from './_components/AnimeList';

type SearchParamsType = {
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export default async function Page({ searchParams }: SearchParamsType) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchAnimeListPage(query);

  return (
    <Box w='100%'>
      <Text fontSize='3xl' fontWeight='bold' mb='5' textAlign='center'>
        アニメ一覧
      </Text>
      <AnimeList query={query} currentPage={currentPage} />
      <Pagination totalPages={totalPages} />
    </Box>
  );
}
