import { Box, HStack, Text } from '@chakra-ui/react';
import Pagination from '@/app/components/Pagination';
import AnimeList from './_components/AnimeList';
import Search from '@/app/components/Search';
import VodFilter from '@/app/components/VodFilter';
import CreateButton from '@/app/components/CreateButton';
import { fetchAnimeListPage } from '@/data/anime';
import { fetchVodLists } from '@/data/vod';

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
    <Box>
      <Text fontSize='3xl' fontWeight='bold' mb='8' textAlign='center'>
        アニメリスト
      </Text>
      <HStack align='center' justify='center' mb='6'>
        <Search />
        <CreateButton link='/admin/anime/create' />
      </HStack>
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
