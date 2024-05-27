import {
  fetchAnimeListPage,
  fetchVodLists,
} from '@/utils/supabase/admin/actions';
import { Box, Text } from '@chakra-ui/react';
import Pagination from '@/app/components/Pagination';
import AnimeList from './_components/AnimeList';
import Search from '@/app/components/Search';
import VodFilter from '@/app/components/VodFilter';

type SearchParamsType = {
  searchParams?: {
    title?: string;
    vod?: string;
    sortBy?: string;
    order?: string;
    page?: string;
  };
};

export default async function Page({ searchParams }: SearchParamsType) {
  const title = searchParams?.title || '';
  const vodId = Number(searchParams?.vod) || null;
  const sortBy = searchParams?.sortBy || 'id';
  const order = searchParams?.order || 'asc';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchAnimeListPage(title, vodId);
  const vodLists = await fetchVodLists();

  return (
    <Box w='100%'>
      <Text fontSize='3xl' fontWeight='bold' mb='8' textAlign='center'>
        アニメ一覧
      </Text>
      <Search />
      <VodFilter vodLists={vodLists} vodId={vodId} />
      <AnimeList
        title={title}
        vodId={vodId}
        sortBy={sortBy}
        order={order}
        currentPage={currentPage}
      />
      {totalPages !== 0 && <Pagination totalPages={totalPages} />}
    </Box>
  );
}
